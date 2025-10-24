import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAobTs0AQWExLGupWhGEbnQSaplUD3eMVs",
  authDomain: "ser-bancario-live.firebaseapp.com",
  projectId: "ser-bancario-live",
  storageBucket: "ser-bancario-live.firebasestorage.app",
  messagingSenderId: "280774426365",
  appId: "1:280774426365:web:4f45ba647b15e4ac918894",
  measurementId: "G-MG3DR7DKK5"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };
