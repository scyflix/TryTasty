import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAuKSZm7BF9pxHW6kkAbhP0pbUw9QxErd0",
  authDomain: "trytasty-64537.firebaseapp.com",
  projectId: "trytasty-64537",
 storageBucket: "trytasty-64537.appspot.com",
  messagingSenderId: "379426398000",
  appId: "1:379426398000:web:49b7236df3218d7306b2f5",
  measurementId: "G-ZMW8ZTX39M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
window.signup = function (event) {
  event.preventDefault();
  const email = document.getElementById("emailForSignup").value;
  const password = document.getElementById("passwordForSignup").value;
  const confirmPassword = document.getElementById("re-enterPasswordForSignup").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Google Sign-In
window.googleLogin = function () {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      alert(`Welcome, ${result.user.displayName}`);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Email/Password Login
window.login = function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("welcomeText").innerText = `Hi, ${user.email}`;
    document.getElementById("logoutBtn").style.display = "block";
  } else {
    document.getElementById("logoutBtn").style.display = "none";
  }
});

// Logout
window.logout = function () {
  signOut(auth)
  .then(() => {
    alert("You have just Logged out.");
    window.location.href = "login.html";
  })
  .catch((error) => {
    console.error("Lougout Error:", error)
    alert("Error Logging out: " + error.message);
  });
};




