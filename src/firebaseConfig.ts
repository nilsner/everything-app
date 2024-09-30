import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCgbTtO_8XEq6P6r4d8XvaNx7yYkXknAb0",
  authDomain: "everything-a689d.firebaseapp.com",
  projectId: "everything-a689d",
  storageBucket: "everything-a689d.appspot.com",
  messagingSenderId: "961053263278",
  appId: "1:961053263278:web:dc4e022ccf6585274f743f",
  measurementId: "G-T0TYLED8ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);