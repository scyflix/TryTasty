import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Import shared auth instance
import { auth } from "./firebase.js";

// Google Sign-In
export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // Automatically add password provider if missing
  const email = result.user.email;
  // You can generate a random password or ask user later
  const autoPassword = crypto.randomUUID().slice(0, 12);
  try {
    const credential = EmailAuthProvider.credential(email, autoPassword);
    await linkWithCredential(auth.currentUser, credential);
    console.log("Password provider linked automatically");
  } catch (err) {
    console.log("Password linking skipped:", err.message);
  }
  return result;
}

// Email signup
export async function signup(userName, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: userName });
    // Automatically link Google provider
    try {
      await linkWithPopup(auth.currentUser, new GoogleAuthProvider());
      console.log("Google provider linked automatically");
    } catch (err) {
      console.log("Google linking skipped:", err.message);
    }
    return cred.user;
  } catch (err) {
    console.error("Signup error:", err);
    throw err;
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
