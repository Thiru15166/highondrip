import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLOMmovmBaVsEVJJfeevOCqdNCfe6Ln7c",
  authDomain: "mensmass-7fa2e.firebaseapp.com",
  projectId: "mensmass-7fa2e",
  storageBucket: "mensmass-7fa2e.firebasestorage.appspot.com",
  messagingSenderId: "549834471892",
  appId: "1:549834471892:web:eb707b9479867e06a2be41",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
