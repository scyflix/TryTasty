
              window.onload = function() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none"; // Hide preloader
  }
            window.addEventListener('load', () => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // Delay to allow fade-out effect
            });
            
           
              // Check if user has already seen the popup
              window.onload = function() {
                if (!localStorage.getItem('popupShown')) {
                  document.getElementById('popup').style.display = 'flex'; // Show popup
                } else {
                  document.getElementById('popup').style.display = 'none'; // Hide popup
                }
              };
              
            
              function closePopup() {
                localStorage.setItem('popupShown', 'true'); // Remember that popup was shown
                document.getElementById('popup').style.display = 'none';
              };
            function showPage(pageId) {
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => page.style.display = 'none');
                document.getElementById(pageId).style.display = 'block';
            };
       

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

            function darkMode() {
              let darkModeEnabled = document.getElementById("dark-mode");
              const body = document.body;
              const header = document.querySelector("header");
              const main = document.querySelector("main");
              const snackcard = document.querySelectorAll(".snackImage");
              if (darkModeEnabled) {
                body.style.backgroundColor = "gray";
                body.style.color = "white";
                header.style.background = "linear-gradient(90deg, orange, yellow)";
                main.style.backgroundColor = "rgb(49, 48, 48)";
                snackcard.forEach(card => {
                  card.style.backgroundColor = "black";
                  card.style.color = "white";
                })
              }
            }
    