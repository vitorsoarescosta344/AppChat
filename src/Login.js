import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Header} from 'react-native-elements';
import {api} from './API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const {data} = await api.post('/login', {
      email: email,
      senha: password,
    });
    if (data.message === 'problemas com o login do usuario') {
      return;
    }

    AsyncStorage.setItem('token', data.message);

    navigation.navigate('Conversas');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
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
              secureTextEntry={true}
              onChangeText={password => setPassword(password)}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity onPress={login}>
            <View style={styles.button}>
              <Text style={{color: 'white', padding: 10}}>Entrar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cadastro');
            }}>
            <Text style={{marginTop: 10}}>Criar conta</Text>
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
