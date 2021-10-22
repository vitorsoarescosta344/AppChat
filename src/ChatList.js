import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {FlatList, StatusBarIOS, StatusBar, TextInput} from 'react-native';
import {Header, Overlay} from 'react-native-elements';
import {api} from './API';
import ListItem from './ListItem';
import {FAB} from 'react-native-paper';

export default function ChatList({navigation}) {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [nome, setNome] = useState('');
  const [visible, setVisible] = useState(false);
  const [nomeDoUser, setNomeDoUser] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');

  const getConversas = async () => {
    const json = await AsyncStorage.getItem('token');

    const {data} = await api.get('/getusers', {
      headers: {'x-access-token': json},
    });

    console.log(data);

    setData(data.contacts);

    setId(data.id);

    setNomeDoUser(data.nome);

    setFoto(data.foto);
  };

  useEffect(() => {
    getConversas();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const novaConversa = async () => {
    const {data} = api.post(
      '/addChats',
      {
        email: email,
      },
      {
        headers: {'x-access-token': await AsyncStorage.getItem('token')},
      },
    );
  };

  const itemSeparator = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 3,
            width: '90%',
            backgroundColor: 'black',
            marginBottom: 0,
            marginTop: 10,
          }}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{position: 'absolute'}}
          data={data}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <ListItem
              item={item}
              navigation={navigation}
              id={id}
              nomeDoUser={nome}
            />
          )}
          ItemSeparatorComponent={itemSeparator}
        />
        <FAB style={styles.fab} onPress={toggleOverlay} />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{width: 350, height: '70%', justifyContent: 'center'}}>
            <View style={styles.inputWrapper}>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  value={email}
                  secureTextEntry={false}
                  onChangeText={email => setEmail(email)}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity onPress={novaConversa}>
                <View style={styles.button}>
                  <Text style={{color: 'white', padding: 10}}>Adcionar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196f3',
  },
  containerInput: {
    height: 40,
    width: '80%',
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 5,
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    width: '80%',
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
  },
});
