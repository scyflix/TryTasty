const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

import { addToFav } from "../js/fav.js";

const recipeContainer = document.getElementById("recipe");

if (!recipeId) {
  recipeContainer.innerHTML = `<a class="backBtn" href="../index.html">← Back</a>
  <p style="text-align: center; opacity: 0.3;">Recipe not found.</p>`;
}

fetch("data/recipes.json")
  .then((response) => response.json())
  .then((data) => {
    const recipe = data.recipes.find((r) => r.id === recipeId);

    const toISO = (min) => `PT${min}M`;

    const recipeSchema = {
      "@context": "https://schema.org",
      "@type": "Recipe",

      name: recipe.title,
      description: recipe.description,
      image: [recipe.image],
      url: window.location.href,

      author: {
        "@type": "Organization",
        name: "TryTasty",
      },

      prepTime: toISO(recipe.prepTimeMin),
      cookTime: toISO(recipe.cookTimeMin),
      totalTime: toISO(recipe.prepTimeMin + recipe.cookTimeMin),

      recipeYield: `${recipe.servings} serving${
        recipe.servings === 1 ? "" : "s"
      }`,

      recipeIngredient: recipe.ingredients,

      recipeInstructions: recipe.steps.map((step) => ({
        "@type": "HowToStep",
        text: step,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(recipeSchema);
    document.head.appendChild(script);



    if (!recipe) {
      recipeContainer.innerHTML = `<a class="backBtn" href="../index.html">← Back</a>
  <p>Recipe not found.</p>`;
      return;
    }

    document.title = `${recipe.title} | TryTasty`;
    const totalTimeMin = recipe.prepTimeMin + recipe.cookTimeMin + recipe.coolTime;
    document.getElementById("recipe").innerHTML = `
    <div class="recipeActionBtns">
    <a class="backBtn" href="../index.html">← Back</a>

    <button class="shareBtn">
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="18" cy="5" r="3" />
  <circle cx="6" cy="12" r="3" />
  <circle cx="18" cy="19" r="3" />
  <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
  <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
</svg>
Share
    </button>
    </div>
                  
                  <article>
                  <h1>${recipe.title}</h1>
                  <section class="meta">
                  <span>⏱ Prep: ${recipe.prepTimeMin} min</span>
                  <span>🔥 Cook: ${recipe.cookTimeMin} min</span>
                  <span>❄️ Cooling: ${recipe.coolTime}</span>
                  <span>⌛ Total: ${totalTimeMin} min</span>
                  <span>🍽 Serves: ${recipe.servings}</span>
                  </section>
                  <p>${recipe.description}</p>
                  <section class="flexRecipeContent">
                  <img loading="lazy" src="${recipe.image}" alt="${
                    recipe.title
                  }" loading="lazy" />
                  <div class="recipeTexts">
                  <section>
                  <h2>Ingredients</h2>
                  <ul>
                  ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
                  </ul>
</section>

                <section>
                <h2>Instructions</h2>
                <ol>
                ${recipe.steps.map((s) => `<li>${s}</li>`).join("")}
                </ol>
                </section>
                <button
                class="add-fav"
                data-key="${recipe.id}"
                data-name="${recipe.title}"
                >
                Add to favorites
                </button>
                </div>
                </section>
                <p class="alsoLike">You might also like <a href="recipe.html?id=${recipe.innerLink[0].link}">${recipe.innerLink[0].name}</a></p>
                </article>
          `;

        })
        .then(() => {
          addToFav();

          const btn = document.querySelector(".shareBtn")
            btn.addEventListener("click", async () => {
              const url = btn.dataset.url || window.location.href;

              if (navigator.share) {
                try {
                  await navigator.share({
                    title: "TryTasty Recipe",
                    text: "Check out this recipe on TryTasty 👀🍽️",
                    url,
                  });
                } catch (err) {
                  // user cancelled – ignore
                }
              } else {
                fallbackShare(url);
              }
            });

          function fallbackShare(url) {
            navigator.clipboard.writeText(url).then(() => {
              alert("Link copied to clipboard!");
            });
          }
        })
  .catch(() => {
    document.getElementById(
      "recipe"
    ).innerHTML = `<a class="backBtn" href="../index.html">← Back</a>
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

  
