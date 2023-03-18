import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ref, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDh1zQvdZDZUNebQeq0Do7mAA1dZKkW71c",
  authDomain: "arksystemapp.firebaseapp.com",
  projectId: "arksystemapp",
  storageBucket: "arksystemapp.appspot.com",
  messagingSenderId: "215775360695",
  appId: "1:215775360695:web:42ed3f1afe938ede5dff32",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getDatabase(firebaseApp);
