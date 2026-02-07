//Export funtion to render recipe js
const favrecipes = JSON.parse(localStorage.getItem("favs")) || [];
export function addToFav() {

  //add to favorite and favorite count
  const favBtns = document.querySelector(".add-fav");

  favBtns.addEventListener("click", () => {
      const recipeName = favBtns.getAttribute("data-name");
      const recipeKey = favBtns.getAttribute("data-key");
const recipeImg = favBtns.getAttribute("data-img");

      const exists = favrecipes.some((f) => f.key === recipeKey);

      const toast = document.getElementById("toast");

      if (!exists) {
        favrecipes.unshift({ name: recipeName, key: recipeKey, img: recipeImg });
        localStorage.setItem("favs", JSON.stringify(favrecipes));

        toast.textContent = "Saved to favorites";
        toast.classList.remove("error");
        toast.classList.add("show");
      } else {
        toast.textContent = "Recipe already exists in favorites";
        toast.classList.remove("show");
        toast.classList.add("error");
      }

      setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.remove("error");
      }, 3000);
    });

  //End of function
}

// Set number immediately when page loads
const favCount = document.getElementById("favCount");
if (favCount) favCount.innerText = favrecipes.length;
// save count
localStorage.setItem("savedFavCount", favrecipes.length);
// update UI number
if (favCount) favCount.innerText = favrecipes.length;
//Display saved recipes and clear button
const favsection = document.getElementById("favs");
const clearFavs = document.getElementById("clearFavs");
if (favrecipes.length === 0) {
  if (favsection) {
    document.querySelector("main").innerHTML =
      `<h2 class=infoNote>You don't have a favorite yet😓</h2>
     <a href="../index.html" class="backBtn">Browse Recipes</a> 
      `;
      
    clearFavs.style.display = "none";
  }
} else {
  if (clearFavs) {
    clearFavs.style.display = "block";
  }
  favrecipes.forEach((recipe) => {
    const a = document.createElement("a");

    const recipeKey = recipe.key || recipe.id; 

    a.href = `recipe.html?id=${recipeKey}`;
    a.className = "snackImage";
a.innerHTML = `<img loading="lazy" src=${recipe.img} alt=${recipe.name}>
<span>${recipe.name}</span>
`;

    a.onclick = () => {
      window.location.href = `recipe.html?id=${recipeKey}`;
    };

    if (favsection) {
      favsection.prepend(a);
    }
  });
}
if (clearFavs) {
  clearFavs.addEventListener("click", () => {
    if (confirm("Are you sure? All saved favorites will be cleared.")) {
      localStorage.removeItem("favs");
      window.location.reload();
      favsection.innerHTML = "<h2>You dont have a favorite yet😓</h2>";
    }
  });
}
