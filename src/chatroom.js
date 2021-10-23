import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

import {io} from 'socket.io-client';
import {api} from './API';

const socket = io('http://192.168.0.13:3000');

export default function ChatRoom({route, navigation}) {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState();

  const getIdDestinatario = async () => {
    const {data} = await api.post('/getiddestinatario', {
      nome: route.params.nomeDoContato,
    });

    setId(data.id);
  };

  const getMessages = async () => {
    const {data} = await api.post('/getmessages', {
      idDaConversa: route.params.idDaConversa,
    });
    let arr = [];

    for (let index = 0; index < data.messages.length; index++) {
      const element = data.messages[index].messages;
      console.log(element);
      arr.push(element);
    }

    setMessages(arr);
  };

  useEffect(() => {
    getMessages();
    getIdDestinatario();
  }, []);

  const onSend = useCallback((messages = []) => {
    socket.emit('message', {
      message: messages,
      idDaConversa: route.params.idDaConversa,
    });
  }, []);

  socket.on('mensagemNova', mensagemNova => {
    let arr = [];

    for (let index = 0; index < mensagemNova.length; index++) {
      const element = mensagemNova[index].messages;
      console.log(element);
      arr.push(element);
    }

    setMessages(arr);
  });

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{_id: route.params.idDoUser}}
    />
  );
}
