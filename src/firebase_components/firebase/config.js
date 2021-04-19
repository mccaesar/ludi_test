import firebase from "@firebase/app";
import "firebase/auth";
// var firebase = require("firebase");

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
  },
  signInFlow: "redirect",
  signInSuccessUrl: "/home",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgYrWpPtXNlmRAKudt3WqpmiPZedoxMFw",
  authDomain: "ludi-cb84b.firebaseapp.com",
  databaseURL: "https://ludi-cb84b.firebaseio.com",
  projectId: "ludi-cb84b",
  storageBucket: "ludi-cb84b.appspot.com",
  messagingSenderId: "626912485500",
  appId: "1:626912485500:web:7b6b13d2517ff82ed569f9",
  measurementId: "G-3G0GS9SY8W",
};

firebase.initializeApp(firebaseConfig);
export { firebaseConfig, uiConfig };
