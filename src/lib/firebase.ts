
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALAzWzREZ73-xiCnUflXi0dx8-Icr4Hxg",
  authDomain: "agra-tour-booking.firebaseapp.com",
  projectId: "agra-tour-booking",
  storageBucket: "agra-tour-booking.firebasestorage.app",
  messagingSenderId: "73396094606",
  appId: "1:73396094606:web:5eb1b16a4772a0d0252bdf"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);