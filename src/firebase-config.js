// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJPGFBog02w2ZfPHB8Q-t5ZcFIupqtVP8",
  authDomain: "qvoting-df522.firebaseapp.com",
  projectId: "qvoting-df522",
  storageBucket: "qvoting-df522.appspot.com",
  messagingSenderId: "35189748203",
  appId: "1:35189748203:web:f5db9b310e60c3e4a929ae",
  measurementId: "G-Q1R7KGQ3RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

const db = getFirestore();
export { db };

