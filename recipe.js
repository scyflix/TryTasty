//TOAST NAVIGATION ACTIVE STATE
const toastLink = document.querySelectorAll("#bottomNavContainer a");

toastLink.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

window.onload = function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // Delay to allow fade-out effect
  }
  //PopUp
  const closePopup = document.getElementById("closePopup");
  closePopup.addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
  });

  //SIGNUP AND LOGIN FORMS
  const signupFormLink = document.getElementById("signupFormLink");
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const loginFormLink = document.getElementById("loginFormLink");

  signupFormLink.addEventListener("click", (event) => {
    event.preventDefault();
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  });

  loginFormLink.addEventListener("click", (event) => {
    event.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });
};

//SIDEBAR TOGGLE
const sidebar = document.getElementById("sidebar");
function toggleSidebar() {
  sidebar.classList.toggle("show");
}
//Version number
const paragraph = document.createElement("p");
paragraph.innerText = "Version: 2.04.03";
sidebar.appendChild(paragraph);

// dark mode
function darkMode() {
  const darkModeBtn = document.getElementById("dark-mode");
  const footer = document.querySelector("footer");
  const body = document.body;
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const snackcard = document.querySelectorAll(".snackImage");

  // Get current state (string!)
  let isDark = localStorage.getItem("darkMode") === "true";

  // Toggle state
  isDark = !isDark;
  localStorage.setItem("darkMode", isDark);

  if (!isDark) {
    // LIGHT MODE
    body.style.backgroundColor = "#fffaf3";
    body.style.color = "#333";

    if (footer) {
      footer.style.backgroundColor = "#fffaf3";
      footer.style.color = "black";
    }

    if (header) header.style.background = "#ffd9a0";
    if (main) main.style.backgroundColor = "white";

    snackcard.forEach((card) => {
      card.style.backgroundColor = "#ffefbbff";
      card.style.color = "black";
    });

    if (darkModeBtn) darkModeBtn.textContent = "Dark Mode";
  } else {
    // DARK MODE
    body.style.backgroundColor = "gray";
    body.style.color = "white";

    if (footer) footer.style.backgroundColor = "black";
    if (header)
      header.style.background = "radial-gradient(circle, yellow, orangered)";
    if (main) main.style.backgroundColor = "rgb(49, 48, 48)";

    snackcard.forEach((card) => {
      card.style.backgroundColor = "black";
      card.style.color = "white";
    });

    if (darkModeBtn) darkModeBtn.textContent = "Light Mode";
  }
}

/*
//check if user has already seen the popup
const popup = this.document.getElementById("popup");
if (popup) {
  if (!localStorage.getItem("popupShown")) {
    document.getElementById("popup").style.display = "flex"; // Show popup
  } else {
    document.getElementById("popup").style.display = "none"; // Hide popup
  }
}

function closePopup() {
  localStorage.setItem("popupShown", "true"); // Remember that popup was shown
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}
*/
//show recipes on click
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.style.display = "none"));
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = "block";
  }
}

// Check if a recipe key is passed in the URL
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeKey = params.get("recipe");
  if (recipeKey) {
    // call showPage to display the saved recipe
    showPage(recipeKey);
  }
});

//To show the recipe bot form
function findRecipe() {
  const userName = document.getElementById("searcher").value.trim();
  const userInput = document.getElementById("userInput").value.trim()
.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  const recipe = document.getElementsByClassName("recipe");
  let matches = [];

  if (userInput === "" || userName === "") {
    alert("Please enter your name and ingredients.");
    return;
  }
  for (let i = 0; i < recipe.length; i++) {
    let keywordsAttr = recipe[i].getAttribute("data-keywords");
    let keywords = keywordsAttr ? keywordsAttr.toLowerCase() : "";
    if (keywords.includes(userInput)) {
      matches.push(recipe[i].outerHTML);
    }
  }

  if (matches.length > 0) {
    suggestions.innerHTML = `${userName}, based on your ingredients, i suggest you try: <br> ${matches.join(
      "<br>"
    )}`;
  } else {
    suggestions.textContent = `${userName}, sorry I do not have a recipe for that yet 😓.`;
  }
}

//FOR RECIPE SUBMITTION
const RecipeForm = document.getElementById("submitRecipeForm");
let savedCount = JSON.parse(localStorage.getItem("savedCount")) || 0;
const recipeSubmissionBtn = document.getElementById("recipeSubmissionBtn");
const submittedCount = document.getElementById("submittedCount");
let count = Number(savedCount);
submittedCount.innerText = count;

recipeSubmissionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //form inputs
  const recipeOwnername = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  //Do not let submitted count work untill all fields are filled
  if (!recipeOwnername || !message || !email) {
    alert("Please fill all fields");
    return;
  } else {
    count++;
    submittedCount.innerText = count;
    localStorage.setItem("savedCount", JSON.stringify(count));
  }
  //Let form work normally(Formspree handles the rest)
  RecipeForm.submit();
});

document.getElementById("clearCountBtn").addEventListener("click", () => {
  localStorage.removeItem("savedCount");
  count = 0;
  submittedCount.innerText = 0;
});
