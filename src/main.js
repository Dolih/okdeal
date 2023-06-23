import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
// import Vuelidate from '@vuelidate/core'
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import VueCookies from 'vue-cookies'


// App.use(Vuelidate)

// firebase.initializeApp( {
//     apiKey: "AIzaSyBKCie5KSBuIwDT-fYa1yQ6fv0FriNrbOM",
//     authDomain: "okdeal-2971e.firebaseapp.com",
//     projectId: "okdeal-2971e",
//     storageBucket: "okdeal-2971e.appspot.com",
//     messagingSenderId: "582851622287",
//     appId: "1:582851622287:web:e4d9c4602f2bfe09a487fa",
//     measurementId: "G-EB2TWZ6KJ8"
//   })

//   let app

//   firebase.auth().onAuthStateChanged(()=>{
//     if(!app) {app = createApp(App).use(store).use(router).mount('#app')}

//   })

import HomeView from './layouts/mainLayout.vue'
let app
createApp(App).use(store).use(router).mount('#app')

  

