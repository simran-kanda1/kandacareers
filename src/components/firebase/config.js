// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEDXRxiPNoTGB2XXQtcmrybod2C1yfufE",
  authDomain: "kandaconsulting-careers.firebaseapp.com",
  projectId: "kandaconsulting-careers",
  storageBucket: "kandaconsulting-careers.appspot.com",
  messagingSenderId: "923237945946",
  appId: "1:923237945946:web:548d9e69246fa5973cfe63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore= app.firestore();
const storage= app.storage();

export { app, firestore, storage}