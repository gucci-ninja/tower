import firebase from "firebase";
import "firebase/firestore";

var config = {
    apiKey: "AIzaSyCdVcilxiFlMvy4NN_gjE85FVT-GcA_a-g",
    authDomain: "tower-c2ef8.firebaseapp.com",
    databaseURL: "https://tower-c2ef8.firebaseio.com",
    projectId: "tower-c2ef8",
    storageBucket: "tower-c2ef8.appspot.com",
    messagingSenderId: "347312528456",
    appId: "1:347312528456:web:8d6acac6b298317556cc7d",
    measurementId: "G-KBD5W9W757"
  };

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// Get a reference to the database service
var database = firebase.database();

export default database;