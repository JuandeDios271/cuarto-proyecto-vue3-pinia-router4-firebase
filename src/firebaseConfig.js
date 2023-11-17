import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyDvwRZxUvXFkRGeFnqTJynB0aa3uoqTj-o",
  authDomain: "vue-3-2023-70808.firebaseapp.com",
  projectId: "vue-3-2023-70808",
  storageBucket: "vue-3-2023-70808.appspot.com",
  messagingSenderId: "897106472616",
  appId: "1:897106472616:web:b3d599649416d849f09c9d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export { auth, db };