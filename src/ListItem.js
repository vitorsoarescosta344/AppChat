import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import React from 'react';

export default function ListItem({item, navigation, id, nomeDoUser}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Sala', {
          idDoContato: item.id,
          nomeDoContato:
            nomeDoUser === item.nomeDoDestinatario
              ? item.nomeDoRemetente
              : item.nomeDoDestinatario,
            idDoUser: id,
          idDaConversa: item._id
        });
      }}>
      <View style={styles.list}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            size="large"
            rounded={true}
            source={{
              uri:
                nomeDoUser === item.nomeDoDestinatario
                  ? item.fotoDoRemetente
                  : item.fotoDoDestinatario,
            }}
          />
          <Text style={styles.title}>
            {nomeDoUser === item.nomeDoDestinatario
              ? item.nomeDoRemetente
              : item.nomeDoDestinatario}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
});
