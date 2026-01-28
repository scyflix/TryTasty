const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
const mode = params.get("mode");

document.addEventListener("DOMContentLoaded", () => {
  if (mode === "cook" && recipeId) {
    enterCookMode(recipeId);
  }
});

function enterCookMode(recipeId) {
  const recipe = document.getElementById("recipe");

  recipe.classList.add("fadeOut");
  document.querySelector("header").classList.add("fadeOut");

  setTimeout(() => {
    recipe.classList.add("disappear");
    document.querySelector("header").classList.add("disappear");
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
          <h3>Grocery List:</h3>
          <div class="listContainer groceryListContainer">
                  ${recipe.utility.groceryList.map((g) => `<label> <input type="checkbox"><span>${g.item}:</span> <span class="valueData">${g.quantity}</span></label>`).join("")}
                  </div>
                   <section class="meta">
                  <span>⏱ Prep: ${recipe.prepTimeMin} min</span>
                  <span>🔥 Cook: ${recipe.cookTimeMin} min</span>
                  <span>❄️ Cooling: ${recipe.coolTime}</span>
                  <span>⌛ Total: ${totalTimeMin} min</span>
                  <span>🍽 Serves: ${recipe.servings}</span>
                  </section>
                            <h3>Equipments:</h3>
                  <section class="listContainer equipmentListContainer">
                  ${recipe.utility.equipment.map((e) => `<label> <input type="checkbox"><span>${e}</span></label>`).join("")}
                  </section>
                            <h3>Steps:</h3>
                  <section class="listContainer stepListContainer">
                  ${recipe.utility.stepFlow.map((s) => `<label> <input type="checkbox"><span>Step ${s.step}:</span><span>${s.text}</span> <span class="valueData">${s.estTimeMin} min</span></label>`).join("")}
                  </section>
                  <div id="completedTask">
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

          
        });
      }