import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAuKSZm7BF9pxHW6kkAbhP0pbUw9QxErd0",
  authDomain: "trytasty-64537.firebaseapp.com",
  projectId: "trytasty-64537",
  storageBucket: "trytasty-64537.firebasestorage.app",
  messagingSenderId: "379426398000",
  appId: "1:379426398000:web:49b7236df3218d7306b2f5",
  measurementId: "G-ZMW8ZTX39M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
window.signup = function(event) {
  event.preventDefault();
  const email = document.getElementById("emailForSignup").value;
  const password = document.getElementById("passwordForSignup").value;
  const confirmPassword = document.getElementById("re-enterPasswordForSignup").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful!");
      window.location.href = "submit.html";
    })
    .catch(error => alert(error.message));
};

// Google Sign-In
window.googleLogin = function() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      alert(`Welcome, ${result.user.displayName}`);
      window.location.href = "index.html";
    })
    .catch(error => alert(error.message));
};

// Email/Password Login
window.login = function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "submit.html";
    })
    .catch(error => alert(error.message));
};

// Monitor auth state changes
onAuthStateChanged(auth, user => {
  if (user) {
    // Show form or user info if logged in
    const welcomeText = document.getElementById("welcomeText");
    if (welcomeText) {
      welcomeText.innerText = `Hi, ${user.email}`;
    }
    const recipeForm = document.getElementById("recipe-form");
    const loginMessage = document.getElementById("login-message");
    if(recipeForm) recipeForm.style.display = "block";
    if(loginMessage) loginMessage.style.display = "none";
  } else {
    // Redirect if not logged in
    window.location.href = "login.html";
  }
});

// Logout
window.logout = function() {
  signOut(auth)
    .then(() => {
      alert("Logout successful!");
      window.location.href = "login.html";
    })
    .catch(error => alert("Logout failed: " + error.message));
};
