const productContainer = document.querySelector(".productContainer");

fetch("../data/temuProduct.json")
.then((response) => {
if(!response.ok) {
      throw new Error("Network response was not ok");
}
    return response.json();
})
.then((data) => {
const temuProductsContainer = document.createElement("div")
temuProductsContainer.classList.add("productCardContainer");

temuProductsContainer.innerHTML = data.products
  .map(
    (product) => `
      <div class="productItemContainer">
          <div class="imgContainer">
            <img
              src="${product.image}"
              alt="${product.title}"
            />
            <p class="textOverlay">${product.imageLabel}</p>
   
               <span class="affiliateLabel">Anzeige(Ad.)</span>
         </div>

         <div class="text">
         <h2><a
         href="${product.link}"
         target="_blank"
         rel="sponsored nofollow"
         >${product.title}</a
         ></h2>
         <p>
         ${product.description.desc1}</p>
         <p>${product.description.desc2}</p>
         <a
         href="${product.link}"
         target="_blank"
         rel="sponsored nofollow"
         class="buyBtn"
         >Check on Temu</a
         >
         </div>
        </div>
      `,
  )
  .join("");

productContainer.prepend(temuProductsContainer);
})