// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP_stW_NK-xXgpbtyfmHpOvNzYD8DNWgM",
  authDomain: "pocketclass-01.firebaseapp.com",
  projectId: "pocketclass-01",
  storageBucket: "pocketclass-01.firebasestorage.app",
  messagingSenderId: "667276761146",
  appId: "1:667276761146:web:343d06b600132178fb7d03",
  measurementId: "G-7TVN4MNQGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);