import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvebqTky_uQq9KuLOUmfy3ka39IEfVVxc",
  authDomain: "antygrevity-ai.firebaseapp.com",
  projectId: "antygrevity-ai",
  storageBucket: "antygrevity-ai.firebasestorage.app",
  messagingSenderId: "730456422934",
  // appId is usually required, but if you haven't added a web app in Firebase Console yet,
  // you might need to add one and paste the appId here.
  appId: "", 
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
