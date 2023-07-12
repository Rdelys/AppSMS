import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import * as SMS from 'expo-sms';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendSMS = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync([phoneNumber], message);
        const newMessage = { content: message, timestamp: Date.now() };
        setMessages([...messages, newMessage]);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageContent}>{item.content}</Text>
      <Text style={styles.messageTimestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp.toString()}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <TouchableOpacity style={styles.button} onPress={sendSMS}>
          <Text style={styles.buttonText}>Envoyer SMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    flexGrow: 1,
  },
  messageContainer: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  messageContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#888888',
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
