// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJUfetCtoxLnDFp13JZ7LR-8svwsbShdA",
  authDomain: "food-33dba.firebaseapp.com",
  projectId: "food-33dba",
  storageBucket: "food-33dba.appspot.com",
  messagingSenderId: "532871797203",
  appId: "1:532871797203:web:36dd64baaf4f30fdaf7726",
  measurementId: "G-8VMPM8M885"
};

// Initialize
const app = initializeApp(firebaseConfig);

// Exports
export const db = getFirestore(app);
export const auth = getAuth(app);

let analytics;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});
export { analytics };
