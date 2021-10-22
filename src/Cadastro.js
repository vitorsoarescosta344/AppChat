import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from 'react-native-elements';
import React, {useState} from 'react';
import {api} from './API';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Cadastro({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [FotoPerfil, setFotoPerfil] = useState(null);

  const cadastro = async () => {
    const formData = new FormData();
    const obj = {
      email: email,
      senha: password,
      nome: nome,
      id: Math.floor(Math.random() * 100000),
    };

    Object.keys(obj).forEach(function (item) {
      formData.append(item, obj[item]);
    });

    if (FotoPerfil !== null) {
      formData.append('file', {
        name: FotoPerfil.assets[0].fileName,
        type: FotoPerfil.assets[0].type,
        uri:
          Platform.OS === 'ios'
            ? FotoPerfil.assets[0].uri.replace('file://', '')
            : FotoPerfil.assets[0].uri,
      });
    }

    const config = {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    };

    const {data} = await api.post('/cadastro', formData, config);

    console.log(data);

    if (data.message === 'success') {
      navigation.navigate('Login');
    }
  };

  function handleChoosePhoto() {
    launchImageLibrary({noData: true}, response => {
      //console.log(response);
      if (response.assets) {
        console.log(response.assets);
        setFotoPerfil(response);
      }
    });
  }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFF',
            borderRadius: 60,
          }}>
          {FotoPerfil === null && (
            <TouchableOpacity
              onPress={() => {
                handleChoosePhoto();
              }}>
              <View
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16}}>Adcionar</Text>
                <Text style={{fontSize: 16}}>Sua</Text>
                <Text style={{fontSize: 16}}>Foto</Text>
              </View>
            </TouchableOpacity>
          )}
          {FotoPerfil !== null && (
            <Image
              source={{uri: FotoPerfil.assets[0].uri}}
              style={{height: 120, width: 120, borderRadius: 60}}
            />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="nome"
              value={nome}
              onChangeText={text => setNome(text)}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="senha"
              value={password}
              secureTextEntry
              onChangeText={password => setPassword(password)}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="confirmar senha"
              value={confirmPassword}
              secureTextEntry
              onChangeText={password => setConfirmPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={cadastro}>
            <View style={styles.button}>
              <Text style={{color: 'white', padding: 10}}>Cadastrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
