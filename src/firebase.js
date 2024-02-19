// firebase.js
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
const firebaseConfig = {
  // Your Firebase configuration here
   apiKey: 'AIzaSyDy3545TwarVApnLK6hqtDjEGResUj61dU',
  databaseURL: 'https://temperature-readings-1799b-default-rtdb.firebaseio.com/',
  projectId: 'temperature-readings-1799b',
authDomain:'temperature-readings-1799b.firebaseapp.com',
storageBucket:'temperature-readings-1799b.appspot.com'
};
firebase.initializeApp(firebaseConfig);


export default firebase;
