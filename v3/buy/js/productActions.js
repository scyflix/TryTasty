const filter = document.getElementById("filter");

export function filterAction() {
  const temuProductCardContainer = document.querySelector(
    ".temuProductCardContainer",
  );
  const amazonProductCardContainer = document.querySelector(
    ".amazonProductCardContainer",
  );

  filter.addEventListener("change", (e) => {
    const value = e.target.value

  if (value === "temu") {
       temuProductCardContainer.classList.remove("hide");
    amazonProductCardContainer.classList.add("hide");
  } else if(value === "amazon") {
       amazonProductCardContainer.classList.remove("hide");
    temuProductCardContainer.classList.add("hide");
  } else {
          temuProductCardContainer.classList.remove("hide");
          amazonProductCardContainer.classList.remove("hide");
  }
});
}
