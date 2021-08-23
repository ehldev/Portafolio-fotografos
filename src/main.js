import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyA4MdFnDf2XDhQvlkboeuqQwANIfqXHNGs",
    authDomain: "erick-apps.firebaseapp.com",
    projectId: "erick-apps",
    storageBucket: "erick-apps.appspot.com",
    messagingSenderId: "534726208871",
    appId: "1:534726208871:web:89a57764f5fbf6e67f13c2",
    measurementId: "G-NDRBD33VS8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')