// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect, useCallback} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text, TextInput, View, LogBox, Button, FlatList} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import LoginScreen from "./src/screens/LoginScreen";
import UsersScreen from "./src/screens/UsersScreen";
import ChatScreen from "./src/screens/ChatScreen";

const firebaseConfig = {
  apiKey: "AIzaSyBcQ2B7YUnY7iuHOLflpFlnw99qK1Orpko",
  authDomain: "react-native-chat-d13ee.firebaseapp.com",
  databaseURL: "https://react-native-chat-d13ee.firebaseio.com",
  projectId: "react-native-chat-d13ee",
  storageBucket: "react-native-chat-d13ee.appspot.com",
  messagingSenderId: "225354470560",
  appId: "1:225354470560:web:cc9f4abac063bbc304a5c5"
};


if(firebase.apps.length === 0) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}


LogBox.ignoreLogs(['Setting a timer']);



const db = firebase.firestore();

const chatsRef = db.collection('chats');


export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([])


  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot.docChanges()
      .filter(({type}) => type === 'added')
      .map(({doc}) => {
        const message  = doc.data()
        return {...message, createdAt: message.createdAt.toDate() }
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  },[]);

  const appendMessages = useCallback((messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [messages])


  async function readUser() {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user))
      }
  }

  async function handlePress() {
      const _id = Math.random().toString(36).substring(7)
      const user = {_id, name }
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }

    async function handleSend (messages) {
      const writes = messages.map(m => chatsRef.add(m))
      await Promise.all(writes)
    }


  if(!user) {
    return (
    <LoginScreen value={name} onChangeText={setName} onPress={handlePress}/>
    )
  }

  return (
 <ChatScreen messages={messages} user={user} onSend={handleSend} />
 //  <UsersScreen messages={messages}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding : 30,
  },
  input : {
    height : 50,
    width : '100%',
    borderWidth : 1,
    padding : 15,
    borderColor : 'grey',
    marginBottom : 20
  }
});
