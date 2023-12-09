import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "space-explorer-811bd.firebaseapp.com",
  projectId: "space-explorer-811bd",
  storageBucket: "space-explorer-811bd.appspot.com",
  messagingSenderId: "599235408466",
  appId: "1:599235408466:web:9946b52997a19ab133a58b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
