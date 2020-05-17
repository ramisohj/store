import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyD9NQqonQKDaJFKF5GQkt1pFH50qkh9n40",
  authDomain: "store-daba0.firebaseapp.com",
  databaseURL: "https://store-daba0.firebaseio.com",
  projectId: "store-daba0",
  storageBucket: "store-daba0.appspot.com",
  messagingSenderId: "435751650212",
  appId: "1:435751650212:web:04854d86c73dd880273731",
  measurementId: "G-VV6M6BLSZX"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;