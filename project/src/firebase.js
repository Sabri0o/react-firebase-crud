// firebase.js configures information to connect with Firebase Project and export Firebase Database service.

import firebase from "firebase/app"
import "firebase/database";

require("dotenv").config();

let config = {
  apiKey: process.env.API_KEY,
    authDomain: "react-firebase-crud-71ae5.firebaseapp.com",
    databaseURL: "https://react-firebase-crud-71ae5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-firebase-crud-71ae5",
    storageBucket: "react-firebase-crud-71ae5.appspot.com",
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APP_ID,
    measurementId: "G-KYXJL0Z2XD"
};

firebase.initializeApp(config);

export default firebase.database();