//add to favorite and favorite count
const favrecipes = JSON.parse(localStorage.getItem("favs")) || [];
const favclass = document.querySelectorAll(".add-fav");

// Set number immediately when page loads
const favCount = document.getElementById("favCount");
if (favCount) favCount.innerText = favrecipes.length;

favclass.forEach((fav) => {
  fav.addEventListener("click", () => {
    const recipeName = fav.getAttribute("data-name");
    const recipeKey = fav.getAttribute("data-key");

    const exists = favrecipes.some((f) => f.key === recipeKey);
    if (!exists) {
      favrecipes.push({ name: recipeName, key: recipeKey });

      // save list
      localStorage.setItem("favs", JSON.stringify(favrecipes));

      // save count
      localStorage.setItem("savedFavCount", favrecipes.length);

      // update UI number
      if (favCount) favCount.innerText = favrecipes.length;
    }

    // Toast notification
    const toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(
      () => (toast.className = toast.className.replace("show", "")),
      3000
    );
  });
});

//Display saved recipes and clear button
const favsection = document.getElementById("favs");
const clearFavs = document.getElementById("clearFavs");
if (favrecipes.length === 0) {
  if(favsection) {
    favsection.innerHTML = "<h2 class=infoNote>You don`t have a favorite yet😓</h2>";
    clearFavs.style.display = "none";
  }
} else {
  if(clearFavs) {
    clearFavs.style.display = "block";
  }
  favrecipes.forEach((recipe) => {
    const a = document.createElement("a");
    a.href = `../index.html?recipe=${recipe.key}`; // link stays on page
    a.textContent = recipe.name + ","; // recipe name
    a.className = "fav-link"; // optional CSS class
    a.onclick = () => showPage(recipe.key); // show the recipe
    if(favsection) {
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
