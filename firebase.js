// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPeRedS7wZ6LDaDo_xaJvWqwidtppgj58",
  authDomain: "temperature-readings-1799b.firebaseapp.com",
  databaseURL: "https://temperature-readings-1799b-default-rtdb.firebaseio.com",
  projectId: "temperature-readings-1799b",
  storageBucket: "temperature-readings-1799b.appspot.com",
  messagingSenderId: "701040875341",
  appId: "1:701040875341:web:9551337307d66b2ba74904",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
