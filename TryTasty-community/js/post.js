//Import authstate
import { onUserAuthChange } from "./../../v3/js/auth.js";
import {sidebarFunc} from "./nav.js"

//Hide preloader when page content loads
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.display = "none";
});

//Open for funtion
const forminputbtn = document.getElementById("forminputbtn");
const postbtn = document.getElementById("postbtn");
const writeIcon = document.querySelector(".writeIcon");

function openform() {
  const form = document.getElementById("allForms");
  const forminputbtn = document.getElementById("forminputbtn");
  const postedContentSection = document.getElementById("postedContent");
  forminputbtn.classList.add("hide");
  postedContentSection.classList.add("hide");
  writeIcon.classList.add("hide");
  form.classList.add("show");
}

//Implement open form funtion
writeIcon.addEventListener("click", () => {
  openform();
  sidebarFunc()
});
forminputbtn.addEventListener("click", () => {
  openform();
});

const postedContentSection = document.getElementById("postedContent");
const postStore = JSON.parse(localStorage.getItem("posts")) || [];
if (postStore) {
  postStore.forEach(renderPost);
}

function post(user) {
  const postTitle = document.getElementById("postTitle").value;
  const postContent = document.getElementById("postContent").value;
const imgUrl = document.getElementById("imgUrl").value;

  if ( !postContent) {
    alert("Your post must have a title and content");
    return;
  }

  const time = new Date().toLocaleString();

  const postData = {
    title: postTitle,
    content: postContent,
    image: imgUrl,
    time: time,
    id: crypto.randomUUID(),
    owner: user ? user.displayName : "Guest",
  };
  postStore.push(postData);
  localStorage.setItem("posts", JSON.stringify(postStore));
  
  renderPost(postData);
  
  postedContentSection.style.display = "block";

  // Reset UI
  document.getElementById("postForm").reset();
  document.getElementById("allForms").classList.remove("show");
  document.getElementById("forminputbtn").classList.remove("hide");
  document.querySelector(".writeIcon").classList.remove("hide");
}

function renderPost(post) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

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
            <div class="ownerData">
            <a href="../v3/userProfile.html">
            <h2 class="postOwner">${post.owner}</h2>
            </a>
            <p class="timeStamp">${post.time}</p>
            </div>
            <div class="ownerActions">
            <button type="button" class="deleteBtn">Delete</button>
            </div>
            </div>

      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <img src="${post.image}">
      <button type="button" class="seeMore">Read more</button>
      </div>
      `;
      postedContentSection.prepend(postDiv);

  
  const postContainer = postDiv.querySelector(".postContainer");
  const seeMoreBtn = postDiv.querySelector(".seeMore");
  
  //See more button logic
  if (postContainer.scrollHeight > postContainer.clientHeight) {
    seeMoreBtn.classList.add("show");
    postContainer.style.paddingBottom = "35px";
  } else {
    seeMoreBtn.classList.add("hide");
  }
  
  seeMoreBtn.addEventListener("click", () => {
    const isClicked = postContainer.classList.toggle("clicked");
    seeMoreBtn.textContent = isClicked ? "Read less" : "Read more";
  });
  
  const deleteBtn = postDiv.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    if (!confirm("Delete this post?")) return;
    postDiv.remove();
    
    const index = postStore.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      postStore.splice(index, 1);
    }
    localStorage.setItem("posts", JSON.stringify(postStore));
  });
}

// Listen for auth state changes

onUserAuthChange((user) => {
  postbtn.addEventListener("click", () => {
   post(user);
   window.location.reload();
  })
});
window.addEventListener("resize", () => {
  document.querySelectorAll(".postContainer").forEach((post) => {
    const seeMoreBtn = post.querySelector(".seeMore");

    if (post.scrollHeight > post.clientHeight) {
      seeMoreBtn.classList.add("show");
    } else {
      seeMoreBtn.classList.add("hide");
    }
  });
});
