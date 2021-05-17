import "firebase/auth";
import "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC5FxlE2kxfIJFnhRop4tKDhaj2SevX2kM",
  authDomain: "birras-santander.firebaseapp.com",
  projectId: "birras-santander",
  storageBucket: "birras-santander.appspot.com",
  messagingSenderId: "897485163653",
  appId: "1:897485163653:web:f62ed663622fab5a87adec",
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { db, app, firebaseConfig, firebase, auth };
