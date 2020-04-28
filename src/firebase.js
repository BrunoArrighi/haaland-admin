import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC0DhrX4t92kAtwiIiM2WAtolsu0H6g1ms",
    authDomain: "haaland-admin.firebaseapp.com",
    databaseURL: "https://haaland-admin.firebaseio.com",
    projectId: "haaland-admin",
    storageBucket: "haaland-admin.appspot.com",
    messagingSenderId: "779880796908",
    appId: "1:779880796908:web:e222174b42891c6ec6cbc9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  export {db, auth, firebase}