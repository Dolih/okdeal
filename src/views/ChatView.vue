<template>
    <div>
      <h2>Отправить сообщение</h2>
      <label for="recipient-id">ID получателя:</label>
      <input type="text" v-model="recipientId" id="recipient-id">
      <label for="message-text">Текст сообщения:</label>
      <textarea v-model="messageText" id="message-text"></textarea>
      <button @click="sendMessage">Отправить</button>
      <h2>Список сообщений</h2>
      <ul>
        <li v-for="message in messages" :key="message.id">
          <div>{{ message.text }}</div>
          <div>Отправитель: {{ message.senderId }}</div>
          <div>Дата: {{ message.date }}</div>
          <div v-if="!message.replied"> 
            <textarea v-model="replyText" :placeholder="'Ответ на сообщение от ' + message.senderId"></textarea>
            <button @click="sendReply(message.id)">Ответить</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  
  export default {
    data() {
      return {
        recipientId: '',
        messageText: '',
        messages: [],
        replyText: '',
      };
    },
    created() {
      this.loadMessages();
    },
    methods: {
      async loadMessages() {
        const currentUser = firebase.auth().currentUser;
        const querySnapshot = await firebase.firestore()
          .collection('messages')
          .where('senderId', '==', currentUser.uid)
          .where('recipientId', '==', this.recipientId)
          .orderBy('date', 'desc')
          .get();
        this.messages = querySnapshot.docs.map(doc => doc.data());
      },
      async sendMessage() {
        const currentUser = firebase.auth().currentUser;
        await firebase.firestore().collection('messages').add({
          senderId: currentUser.uid,
          recipientId: this.recipientId,
          text: this.messageText,
          date: new Date(),
          replied: false,
        });
        this.messageText = '';
        this.loadMessages();
      },
      async sendReply(messageId) {
        const currentUser = firebase.auth().currentUser;
        const messageRef = firebase.firestore().collection('messages').doc(messageId);
        await messageRef.update({
          replied: true,
          replyText: this.replyText,
          replySenderId: currentUser.uid,
          replyDate: new Date(),
        });
        this.replyText = '';
        this.loadMessages();
      },
    },
  };
  </script>