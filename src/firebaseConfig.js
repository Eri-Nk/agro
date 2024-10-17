// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ0cBD5jPxNJUh7j_aoJIkkI8JO14iY2o",
  authDomain: "eriko-agro.firebaseapp.com",
  projectId: "eriko-agro",
  storageBucket: "eriko-agro.appspot.com",
  messagingSenderId: "739215326097",
  appId: "1:739215326097:web:9d1840e5be576ae89cb830",
  measurementId: "G-WG1QXZDGKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
