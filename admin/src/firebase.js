// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNmoa4jrVeNG8PE82lqeHety6tbFuab8g",
  authDomain: "blogposts-b619e.firebaseapp.com",
  projectId: "blogposts-b619e",
  storageBucket: "blogposts-b619e.appspot.com",
  messagingSenderId: "341266133967",
  appId: "1:341266133967:web:5015c84c751f47215618ba",
  measurementId: "G-FMGCJ3K13K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;