const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
const mode = params.get("mode");

document.addEventListener("DOMContentLoaded", () => {
  if (mode === "cook" && recipeId) {
    enterCookMode(recipeId);
  }
});

function enterCookMode(recipeId) {

  setTimeout(() => {
    document.querySelector("main").classList.add("activeUtilityMain");
    document.body.classList.add("lockScroll");
  }, 1000);

  const recipeUtilitySection = document.getElementById("recipeUtility");

  fetch("data/recipes.json")
    .then((res) => res.json())
    .then((data) => {
      const recipe = data.recipes.find((r) => r.id === recipeId);
      if (!recipe) return;

      const totalTimeMin =
        recipe.prepTimeMin + recipe.cookTimeMin + recipe.coolTime;

      recipeUtilitySection.innerHTML = `
            <a class="backBtn" href="recipe.html?id=${recipe.id}">← Exit cook mode</a>
          <h2>Cooking: ${recipe.title}</h2>
          <section class="meta">
         <span>⏱ Prep: ${recipe.prepTimeMin} min</span>
         <span>🔥 Cook: ${recipe.cookTimeMin} min</span>
         <span>❄️ Cooling: ${recipe.coolTime}</span>
         <span>⌛ Total: ${totalTimeMin} min</span>
         <span>🍽 Serves: ${recipe.servings}</span>
         </section>
          <h3>Grocery List:</h3>
          <div class="listContainer groceryListContainer">
                  ${recipe.utility.groceryList.map((g) => `<label> <input type="checkbox"><span>${g.item}:</span> <span class="valueData">${g.quantity}</span></label>`).join("")}
                  </div>
                            <h3>Equipments:</h3>
                  <section class="listContainer equipmentListContainer">
                  ${recipe.utility.equipment.map((e) => `<label> <input type="checkbox"><span>${e}</span></label>`).join("")}
                  </section>
                            <h3>Steps:</h3>
                  <section class="listContainer stepListContainer">
                  ${recipe.utility.stepFlow.map((s) => `<label> <input type="checkbox"><span>Step ${s.step}:</span><span>${s.text}</span> <span class="valueData">${s.estTimeMin} min</span></label>`).join("")}
                  </section>
          <div id="completedTask">
          <h3>Completed:</h3>
  <!--Cook mode completed task-->
</div>
          <p style="text-align: center; opacity: 0.3;">Cooking mode details  will show here</p>
          `;
          
         recipeUtilitySection.addEventListener("change", (e) => {
           if (e.target.type !== "checkbox") return;

           const checkbox = e.target;
           const label = checkbox.closest("label");
           const checkedContainer = document.getElementById("completedTask");

           if (checkbox.checked) {
             checkedContainer.appendChild(label);
           }
         });


        })
        .catch(() => {
            document.getElementById("recipeUtility").innerHTML =
              `<a class="backBtn" href="../index.html">← Home</a>
            <div style="text-align: center;" class="failedToLoad">
            <svg width="240" height="220" viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg">
            <!-- background blob -->
            <ellipse cx="120" cy="120" rx="95" ry="70" fill="#fff6e6"/>
            
            <!-- plate -->
            <circle cx="120" cy="115" r="55" fill="#ffffff" stroke="#ffc861" stroke-width="3"/>
            <circle cx="120" cy="115" r="35" fill="#fff3cf"/>
            
            <!-- sad face -->
          <circle cx="108" cy="108" r="4" fill="#333"/>
          <circle cx="132" cy="108" r="4" fill="#333"/>
          <path d="M105 128 Q120 118 135 128" stroke="#333" stroke-width="3" fill="none"/>
        
          <!-- spoon -->
          <rect x="60" y="85" width="8" height="55" rx="4" fill="#b4c3ff"/>
          <circle cx="64" cy="80" r="10" fill="#b4c3ff"/>
        
          <!-- fork -->
          <rect x="172" y="85" width="8" height="55" rx="4" fill="#b4c3ff"/>
          <rect x="169" y="75" width="3" height="12" rx="2" fill="#b4c3ff"/>
          <rect x="173" y="75" width="3" height="12" rx="2" fill="#b4c3ff"/>
          <rect x="177" y="75" width="3" height="12" rx="2" fill="#b4c3ff"/>
        
          <!-- floating sparkles -->
          <circle cx="40" cy="55" r="4" fill="#ffe07a"/>
          <circle cx="205" cy="50" r="5" fill="#ffe07a"/>
          <circle cx="200" cy="165" r="4" fill="#ffe07a"/>
          
          <!-- title -->
          <text x="120" y="185" text-anchor="middle" font-size="12" font-family="Arial" fill="#666">
          Oops… snacks didn’t load
          </text>
          </svg>
          
          <p style="text-align: center; opacity: 0.3;">Failed to load data. Please reload the app.
          </p>
          </div>`;
        });
      }