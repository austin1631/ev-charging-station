// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import GlobalApi from "./GlobalApi";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: GlobalApi.FIREBASE_API,
  authDomain: "ev-charging-station-417017.firebaseapp.com",
  projectId: "ev-charging-station-417017",
  storageBucket: "ev-charging-station-417017.appspot.com",
  messagingSenderId: "739691979932",
  appId: "1:739691979932:web:225e825f173dcecdee3959",
  measurementId: "G-ZGSYSXG380"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
