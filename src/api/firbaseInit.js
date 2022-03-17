// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_APPID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: "react-admin-client-f9c92.firebaseapp.com",
  projectId: "react-admin-client-f9c92",
  storageBucket: "react-admin-client-f9c92.appspot.com",
  messagingSenderId: "958000902476",
  appId: REACT_APP_FIREBASE_APPID,
  measurementId: "G-TK1HXLCNQ9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp);