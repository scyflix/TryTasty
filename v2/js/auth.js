import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Import shared auth instance
import { auth } from "./firebase.js";

// Google Sign-In
export function googleLogin() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// Email signup
export async function signup(userName, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: userName });
    return cred.user;
  } catch (err) {
    console.error("Signup error:", err);
    throw err; // UI can catch and show messages
  }
}


// Email login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout
export function logout() {
  return signOut(auth);
}

// Auth state listener
export function onUserAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
