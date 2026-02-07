const page = document.querySelector(".page");

fetch("v3/data/recipes/recipes1.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })

  .then((data) => {
    const allRecipeDiv1 = document.createElement("div")
    allRecipeDiv1.classList.add("allRecipeDiv")

    const loadMoreBtn1 = document.createElement("button")
    loadMoreBtn1.type = "button"
    loadMoreBtn1.id = "loadMoreBtn1"
    loadMoreBtn1.classList.add("loadMoreBtns")

loadMoreBtn1.innerHTML = `
<span>Load More</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>
`;
allRecipeDiv1.innerHTML = data.recipes
.map(
  (rec) => `
  <a href="v3/recipe.html?id=${rec.id}"
  data-keywords="${rec.dataKeywords}"
  class="snackImage recipe"
  ><img loading="lazy"
  src="${rec.image}"
  title="Click to see details"
  alt="${rec.title}"
  />${rec.title}</a>
  `,
)
.join("");

      page.prepend(allRecipeDiv1)
      page.appendChild(loadMoreBtn1)
  })
  .then(() => {
    loadMoreRecipes();
  })
  .catch(() => {
    page.innerHTML = `
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
            <a href="feedbacks/index.html">Report this issue</a>
  </div>
  `;
  });


  //function to load more recipes
  function loadMoreRecipes() {
    const loadMoreBtn1 = document.getElementById("loadMoreBtn1")

    loadMoreBtn1.addEventListener("click", () => {
loadMoreBtn1.classList.add("hide")

      fetch("v3/data/recipes/recipes2.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })

        .then((data) => {
          const allRecipeDiv2 = document.createElement("div");
          allRecipeDiv2.classList.add("allRecipeDiv");

          const loadMoreBtn2 = document.createElement("button");
          loadMoreBtn2.type = "button";
          loadMoreBtn2.id = "loadMoreBtn2";
          loadMoreBtn2.classList.add("loadMoreBtns")

          loadMoreBtn2.innerHTML = `
<span>Load More</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>
`;
allRecipeDiv2.innerHTML = data.recipes
.map(
  (rec) => `
  <a href="v3/recipe.html?id=${rec.id}"
  data-keywords="${rec.dataKeywords}"
  class="snackImage recipe"
  ><img loading="lazy"
  src="${rec.image}"
  title="Click to see details"
  alt="${rec.title}"
  />${rec.title}</a>
  `,
)
.join("");

page.append(allRecipeDiv2);
page.appendChild(loadMoreBtn2);
        })
        .catch(() => {
          page.innerHTML = `
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
            <a href="feedbacks/index.html">Report this issue</a>
  </div>
  `;
        });

    })
  }