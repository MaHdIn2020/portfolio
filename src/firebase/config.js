import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4E9khtCi0RhfceCCVTxR8myIueXO_Ano",
  authDomain: "portfolio-mahdin.firebaseapp.com",
  projectId: "portfolio-mahdin",
  storageBucket: "portfolio-mahdin.firebasestorage.app",
  messagingSenderId: "319872304756",
  appId: "1:319872304756:web:b6aad221909c5b2ca9b321"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
