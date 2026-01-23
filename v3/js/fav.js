//Export funtion to render recipe js
const favrecipes = JSON.parse(localStorage.getItem("favs")) || [];
export function addToFav() {

  //add to favorite and favorite count
  const favBtns = document.querySelectorAll(".add-fav");

  favBtns.forEach((fav) => {
    fav.addEventListener("click", () => {
      const recipeName = fav.getAttribute("data-name");
      const recipeKey = fav.getAttribute("data-key");

      const exists = favrecipes.some((f) => f.key === recipeKey);

      const toast = document.getElementById("toast");

      if (!exists) {
        favrecipes.push({ name: recipeName, key: recipeKey });
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
    favsection.innerHTML =
      "<h2 class=infoNote>You don`t have a favorite yet😓</h2>";
    clearFavs.style.display = "none";
  }
} else {
  if (clearFavs) {
    clearFavs.style.display = "block";
  }
  favrecipes.forEach((recipe) => {
    const a = document.createElement("a");

    const recipeKey = recipe.key || recipe.id; // whatever your real key is

    a.href = `recipe.html?id=${recipeKey}`;
    a.textContent = recipe.name + ",";
    a.className = "fav-link";

    a.onclick = () => {
      window.location.href = `recipe.html?id=${recipeKey}`;
    };

    if (favsection) {
      favsection.appendChild(a);
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
