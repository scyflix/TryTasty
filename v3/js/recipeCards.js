const page = document.querySelector(".page");

fetch("v3/data/recipes.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })

  .then((data) => {
    page.innerHTML = data.recipes
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
  </div>
  `;
  });
