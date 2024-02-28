// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_api,
  authDomain: "food-ordering-app-2630b.firebaseapp.com",
  projectId: "food-ordering-app-2630b",
  storageBucket: "food-ordering-app-2630b.appspot.com",
  messagingSenderId: "943660718002",
  appId: "1:943660718002:web:d58d227894055c86fc36ab",
  measurementId: "G-X227XZM8Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
