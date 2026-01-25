
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbZGjpJW-ygHHqg17SLJSgHJY5bCZn_og",
  authDomain: "ft-asbl.firebaseapp.com",
  projectId: "ft-asbl",
  storageBucket: "ft-asbl.firebasestorage.app",
  messagingSenderId: "500237051154",
  appId: "1:500237051154:web:3a138732f4a0cdc2fc7fcb",
  measurementId: "G-JHLEWWQCM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;