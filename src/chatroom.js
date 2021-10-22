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

    setMessages(data.messages);
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
    console.log(mensagemNova.messages);
    setMessages(mensagemNova.messages);
  });

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{_id: route.params.idDoUser}}
    />
  );
}
