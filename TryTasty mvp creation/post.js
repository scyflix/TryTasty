import { onUserAuthChange } from "./../v3/js/auth.js";
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.display = "none";
});

// Listen for auth state changes

const forminputbtn = document.getElementById("forminputbtn");
const postbtn = document.getElementById("postbtn");
function openform() {
      
      const form = document.getElementById("allForms");
  const forminputbtn = document.getElementById("forminputbtn");
  const postedContentSection = document.getElementById("postedContent");
  postedContentSection.style.display = "none";
  forminputbtn.style.display = "none";
  form.style.display = "block";
}
forminputbtn.addEventListener("click", () => {
      openform()
})

function post() {
      const postTitle = document.getElementById("postTitle").value;
      const postContent = document.getElementById("postContent").value;
      if (!postTitle || !postContent) {
    alert("Your post must have a title and content");
    return;
  }
  
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const time = new Date()
  const timeContent = time.toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
  });
  
  postDiv.innerHTML = `
  <a href="../v3/userProfile.html">
   <svg
   class="profileImg"
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 -960 960 960"
   fill="currentColor"
   aria-hidden="true"
   >
   <path
   d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
   />
   </svg>
            
          </a>
      <div class="postContainer">
<div class="postHeader">
<a href="../v3/userProfile.html">
<h2 class="postOwner"></h2>
</a>
<p class="timeStamp">${timeContent}</p>
</div>

      <h3>${postTitle}</h3>
      <p>${postContent}</p>
      </div>
      `;
      
      const postedContentSection = document.getElementById("postedContent");
      postedContentSection.style.display = "block";
  postedContentSection.prepend(postDiv);
  
  const form = document.getElementById("allForms");
  const postForm = document.getElementById("postForm");
  
  postForm.reset();
  
  form.style.display = "none";
  const forminputbtn = document.getElementById("forminputbtn");
  forminputbtn.style.display = "block";
}

postbtn.addEventListener("click", () => {
      post();
      onUserAuthChange((user) => { const latestPost = document.querySelector(".post"); 
             const ownerElement = latestPost.querySelector(".postOwner");
              if (user) { ownerElement.textContent = user.displayName; 

              } else { ownerElement.textContent = "Guest"; 

              } 
            }); 
            const postContainer = document.querySelector(".postContainer")
            postContainer.addEventListener("click", () => {
                  postContainer.classList.toggle("clicked");
            })
      })
