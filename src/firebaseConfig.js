import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "all-i-know.firebaseapp.com",
  projectId: "all-i-know",
  storageBucket: "all-i-know.appspot.com",
  messagingSenderId: "659260843969",
  appId: "1:659260843969:web:6eef96f0bc234a65287140",
  measurementId: "G-57H6BFR4VR"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();