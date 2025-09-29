
window.onload = function() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500); // Delay to allow fade-out effect
  } 
}
const sidebar = document.getElementById("sidebar");
function toggleSidebar() {
  sidebar.classList.toggle("show");
}
  //dark mode
  function darkMode() {
    const darkModeBtn = document.getElementById("dark-mode");
    const footer = document.querySelector("footer");
  const body = document.body;
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const snackcard = document.querySelectorAll(".snackImage");
  // Toggle dark mode state
  let isDark = localStorage.getItem("darkMode") === "true";
  isDark = !isDark;
  localStorage.setItem("darkMode", isDark);

  if (isDark) {
    body.style.backgroundColor = "#fffaf3";
    body.style.color = "#333";
    if (footer) {
      footer.style.backgroundColor = "#fffaf3";
      footer.style.color = "black";
    }
    if (header) header.style.background = "#ffd9a0";
    if (main) main.style.backgroundColor = "white";
    snackcard.forEach(card => {
      card.style.backgroundColor = "#ffefbbff";
      card.style.color = "black";
    });
       if (darkModeBtn) darkModeBtn.textContent = "Dark Mode";
  } else {
     body.style.backgroundColor = "gray";
    body.style.color = "white";
    if (footer) footer.style.backgroundColor = "black";
    if (header) header.style.background = "radial-gradient(circle, yellow, orangered)";
    if (main) main.style.backgroundColor = "rgb(49, 48, 48)";
    snackcard.forEach(card => {
      card.style.backgroundColor = "black";
      card.style.color = "white";
    });
    if (darkModeBtn) darkModeBtn.textContent = "Light Mode";
  }
}
    
    // On page load, apply dark mode if set
      // ...existing preloader code...
      if (localStorage.getItem("darkMode") === "true") {
        darkMode();
      }
      
  
    //check if user has already seen the popup
    const popup = this.document.getElementById("popup");
      if(popup) {
        if (!localStorage.getItem('popupShown')) {
                    document.getElementById('popup').style.display = 'flex'; // Show popup
                  } else {
                    document.getElementById('popup').style.display = 'none'; // Hide popup
                  }
      }
                  
                function closePopup() {
                  localStorage.setItem('popupShown', 'true'); // Remember that popup was shown
                  const popup = document.getElementById('popup');
                  popup.style.display = 'none';
                };
  
                //show recipes on click
              function showPage(pageId) {
                  const pages = document.querySelectorAll('.page');
                  pages.forEach(page => page.style.display = 'none');
                  const page = document.getElementById(pageId);
                  if(page) {
                    page.style.display = 'block';
                  } 
              };

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
            window.findRecipe =
            function() {
                const userName = document.getElementById("userName").value.trim();
                const userInput = document.getElementById("userInput").value.trim().toLowerCase();
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
                };
                
                if (matches.length > 0) {
                     suggestions.innerHTML = `<h3>${userName}, based on your ingredients, i suggest you try these recipes:</h3> <br> ${matches.join("<br>")}`;
                                } else {
                                    suggestions.textContent = `${userName}, sorry I do not have a recipe for that yet 😓.`;
                }
            };
    

