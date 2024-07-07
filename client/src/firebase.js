// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-fce33.firebaseapp.com",
    projectId: "mern-auth-fce33",
    storageBucket: "mern-auth-fce33.appspot.com",
    messagingSenderId: "419362008791",
    appId: "1:419362008791:web:3077531f4992467fa54a92"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);