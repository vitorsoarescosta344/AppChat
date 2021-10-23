import React from 'react';

import {Header} from 'react-native-elements';
import Cadastro from './src/Cadastro';
import Login from './src/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ChatList from './src/ChatList';
import ChatRoom from './src/chatroom';
import {AuthContext} from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => ({
    signIn: token => {
      setUserToken(token);
      AsyncStorage.setItem('token', token);
    },
    signOut: () => {
      AsyncStorage.setItem('token', null);
    },
    signUp: () => {},
  }));

  async function Timeout() {
    setTimeout(async () => {
      console.log();
      const userToken = await AsyncStorage.getItem('token');
      setUserToken(userToken);
      setIsLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    Timeout();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large"/>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={userToken !== null ? 'Conversas' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Conversas" component={ChatList} options={{}} />
          <Stack.Screen name="Sala" component={ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
