const favrecipes = JSON.parse(localStorage.getItem("favs")) || [];

//Export funtion to render recipe js
export async function addToFav() {

  document.addEventListener("DOMContentLoaded", () => {
    //add to favorite and favorite count
  const favclass = document.querySelectorAll(".add-fav");

  
  favclass.forEach((fav) => {
    fav.addEventListener("click", () => {
      const recipeName = fav.getAttribute("data-name");
      const recipeKey = fav.getAttribute("data-key");

      const exists = favrecipes.some((f) => f.key === recipeKey);
      if (!exists) {
        favrecipes.push({ name: recipeName, key: recipeKey });

        // save list
        localStorage.setItem("favs", JSON.stringify(favrecipes));

        
        // Toast notification
        const toast = document.getElementById("toast");
        toast.className = "show";
        setTimeout(
          () => (toast.className = toast.className.replace("show", "")),
          3000
        );
      } else {
        // Toast notification
        const toast = document.getElementById("toast");
        toast.textContent = "Error! recipe not saved or recipe already exist.";
        toast.className = "error";
        setTimeout(
          () => (toast.className = toast.className.replace("error", "")),
          3000
        );
      }
    });
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