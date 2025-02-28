import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx1dLj_JKRbtsZ_YNtjmnG_G9XtmdpU5Q",
  authDomain: "aotoz-1b737.firebaseapp.com",
  projectId: "aotoz-1b737",
  storageBucket: "aotoz-1b737.firebasestorage.app",
  messagingSenderId: "113772394676",
  appId: "1:113772394676:web:832e0a6a185045085effe1",
  measurementId: "G-PYF10H64YD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
