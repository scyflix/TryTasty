import { auth } from "./js/firebase.js";
import {
  googleLogin,
  signup,
  login,
  logout,
  onUserAuthChange,
} from "./../v2/js/auth.js";

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
const googleBtn = document.querySelectorAll(".google-btn");
const infoNoteLogin = document.querySelector(".infoNoteLogin");

window.googleLogin = async () => {
  try {
    const result = await googleLogin();
    alert(`Welcome, ${result.user.displayName}`);
    window.location.href = "submit.html";
  } catch (e) {
    alert(e.message);
  }
};
googleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    googleLogin();
  });
});

// Signup
signupBtn.addEventListener("click", async () => {
  const userNameInputValue = document.getElementById("userNameInput").value;
  const email = document.getElementById("emailForSignup").value;
  const password = document.getElementById("passwordForSignup").value;
  const confirmPassword = document.getElementById(
    "re-enterPasswordForSignup"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Call modular signup function
    const user = await signup(userNameInputValue, email, password);

    //update UI immediately
    const userName = document.getElementById("userName");
    if (userName) userName.innerText = user.displayName;

    alert("Signup successful!");
    window.location.href = "../index.html";
  } catch (error) {
    alert(error.message);
  }
});

//Login
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    await login(email, password); // calls auth.js login()
    alert("Login successful!");
    window.location.href = "../index.html"; // redirect after login
  } catch (error) {
    infoNoteLogin.classList.add("errorShow");
    if ((error.message = "Firebase: Error (auth/invalid-credential)")) {
      infoNoteLogin.textContent =
        "The credential is malformed or expired. Try google signin";
    } else if ((error.message = "Firebase: Error (auth/too-many-requests).")) {
      infoNoteLogin.textContent = "Too many requests. Try again later";
    } else if ((error.message = "Firebase: Error (auth/user-not-found).")) {
      infoNoteLogin.textContent = "No user exists with this email.";
    } else {
      infoNoteLogin.textContent = error.message;
    }
  }
});

//Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await logout(); // calls auth.js logout()
    alert("Logged out successfully!");
    window.location.href = "welcome.html"; // redirect after logout
  } catch (error) {
    alert(error.message);
  }
});

// Listen for auth state changes
onUserAuthChange((user) => {
  if (user) {
    welcomeText &&
      (welcomeText.innerText = user.displayName || user.email || "User");
    Useremail && (Useremail.innerText = user.email || "-");
    userName && (userName.innerText = user.displayName || "Profile"); // ✅ fixed
    logoutBtn && (logoutBtn.style.display = "block");
    loginBtn && (loginBtn.innerText = "Logout");
    popup && (popup.style.display = "none");
    loginInputForm && (loginInputForm.style.display = "none");
    nonUserMessage && (nonUserMessage.style.display = "none");
    recipeForm && (recipeForm.style.display = "block");
    videosPage && (videosPage.style.display = "block");
  } else {
    Useremail && (Useremail.innerText = "Login first");
    userName && (userName.innerText = "Login first"); // ✅ fixed
    logoutBtn && (logoutBtn.innerText = "Login");
    popup && (popup.style.display = "block");
    nonUserMessage && (nonUserMessage.style.display = "block");
    recipeForm && (recipeForm.style.display = "none");
    welcomeText && (welcomeText.innerText = "");
    loginInputForm && (loginInputForm.style.display = "block");
    videosPage && (videosPage.style.display = "none");
    loginLink && (loginLink.style.display = "block");
  }
});
