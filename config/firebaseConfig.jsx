import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0iogPhSvTI0l5LDOQ_o3eXw6_YTyWSrs",
  authDomain: "quizzapp-cb9fb.firebaseapp.com",
  projectId: "quizzapp-cb9fb",
  storageBucket: "quizzapp-cb9fb.firebasestorage.app",
  messagingSenderId: "403203367061",
  appId: "1:403203367061:web:e33761e1cfcfca5a5cfb9c",
  measurementId: "G-TLBWT6T3ZT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics: import dinámico para evitar "window is not defined"
export let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  });
}