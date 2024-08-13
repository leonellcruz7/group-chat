// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnZkt5eB8_ttF7PszPjAFJvjb4hExeyeY",
  authDomain: "group-chat-18781.firebaseapp.com",
  projectId: "group-chat-18781",
  storageBucket: "group-chat-18781.appspot.com",
  messagingSenderId: "216520359263",
  appId: "1:216520359263:web:c8c0331046f28905c78aea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
