// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore (always safe)
export const db = getFirestore(app);

// ✅ Analytics only if supported (browser + correct setup)
let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics enabled ✅");
  } else {
    console.warn("Analytics not supported in this environment ⚠️");
  }
});

export { analytics };
