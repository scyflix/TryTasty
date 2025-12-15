import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAuKSZm7BF9pxHW6kkAbhP0pbUw9QxErd0",
  authDomain: "trytasty-64537.firebaseapp.com",
  projectId: "trytasty-64537",
  storageBucket: "trytasty-64537.appspot.com",
  messagingSenderId: "379426398000",
  appId: "1:379426398000:web:49b7236df3218d7306b2f5",
  measurementId: "G-ZMW8ZTX39M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Google Sign-In
window.googleLogin = function () {
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider)
  .then((result) => {
    alert(`Welcome, ${result.user.displayName}`);
    window.location.href = "submit.html";
  })
  .catch((error) => {
    alert(error.message);
  });
};


// Wait for DOM so getElementById won't return null if script is in <head>
window.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    const logoutBtn = document.getElementById("logoutBtn");
    const welcomeText = document.getElementById("welcomeText");
    const popup = document.getElementById("popup");
    const loginInputForm = document.getElementById("loginInputForm");
    const nonUserMessage = document.getElementById("non-userMessage");
    const recipeForm = document.getElementById("recipeSubmissionForm");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const videosPage = document.getElementById("videosPage");
    const userName = document.getElementById("userName");
    const Useremail = document.getElementById("Useremail");
    const loginLink = document.getElementById("loginLink");
    
    //If user is singed in do the following
    if (user) {
    if (welcomeText)
      welcomeText.innerText = ` ${user.displayName || user.email || "user"}`;
    if (Useremail) Useremail.innerText = user.email || "-";
    if (userName) userName.innerText = user.displayName || "Profile";
    if (logoutBtn) logoutBtn.style.display = "block";
    if (loginBtn) loginBtn.innerText = "Logout";
    if (popup) popup.style.display = "none";
    if (loginInputForm) loginInputForm.style.display = "none";
    if (nonUserMessage) nonUserMessage.style.display = "none";
    if (recipeForm) recipeForm.style.display = "block"; // show form to logged-in users
    if (videosPage) videosPage.style.display = "block";
    } 
    
    //If user is NOT signed in do the following
    else {
    if (Useremail) Useremail.innerText = "Login first";
    if (userName) userName.innerText = "Login first";
    if (logoutBtn) logoutBtn.innerText = "Login";
    if (popup) popup.style.display = "block";
    if (nonUserMessage) nonUserMessage.style.display = "block";
    if (recipeForm) recipeForm.style.display = "none";
    if (welcomeText) welcomeText.innerText = ""; // clear greeting
    if (loginInputForm) loginInputForm.style.display = "block";
    if (videosPage) videosPage.style.display = "none";
    if (loginLink) loginLink.style.display = "block";
    }
    });
    });
    
    // Signup
    signupBtn.addEventListener("click", () => {
      const userName = document.getElementById("userName").value;
      const email = document.getElementById("emailForSignup").value;
      const password = document.getElementById("passwordForSignup").value;
      const confirmPassword = document.getElementById(
        "re-enterPasswordForSignup"
      ).value;
    
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          return updateProfile(userCredential.user, {
            displayName: userName,
          });
        })
        .then(() => {
          alert("Signup successful!");
          window.location.href = "../index.html";
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    // Email/Password Login
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Login successful!");
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 2000);
        })
        .catch((error) => {
          alert(error.message);
        });
      });
      

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      setTimeout(() => {
        alert("You have just logged out");
        window.location.href = "welcome.html";
      }, 2000);
    })
    .catch((error) => {
      console.error("Lougout Error:", error);
      alert("Error Logging out: " + error.message);
    });
});