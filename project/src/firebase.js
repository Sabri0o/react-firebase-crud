// firebase.js configures information to connect with Firebase Project and export Firebase Database service.

import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyCHuA3VIkKJ7eEYNB9KmpoGsV4vlYe6xJ8",
  authDomain: "react-firebase-crud-71ae5.firebaseapp.com",
  databaseURL:
    "https://react-firebase-crud-71ae5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-firebase-crud-71ae5",
  storageBucket: "react-firebase-crud-71ae5.appspot.com",
  messagingSenderId: "759839378430",
  appId: "1:759839378430:web:40467b4c5a1d442d4f8eaf",
  measurementId: "G-KYXJL0Z2XD",
};

firebase.initializeApp(config);

export default firebase.database();
