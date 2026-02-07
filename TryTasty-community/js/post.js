//Import authstate
import { onUserAuthChange } from "./../../v3/js/auth.js";
import { sidebarFunc } from "./nav.js";

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
  sidebarFunc();
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

  if (!postContent) {
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
  const postArticle = document.createElement("article");
  postArticle.classList.add("post");

  postArticle.innerHTML = `
        <!--POST PROFILE BEGINS-->
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
                    <!--POST PROFILE ENDS-->

                        <!-- POST HEADER -->
            <div class="postContainer">
            
            <header class="postHeader">
            <div class="ownerData">
            <a href="../v3/userProfile.html">
            <h2 class="postOwner">${post.owner}</h2>
            </a>
            <p class="timeStamp">${post.time}</p>
            </div>

            <div class="ownerActions">
            <button type="button" class="deleteBtn">Delete</button>
            </div>
            </header>
                        <!-- POST HEADER ENDS -->

                                                <!-- POST CONTENT -->
<div class="postContent">
<h3>${post.title}</h3>
<p>${post.content}</p>
<img src="${post.image}">
<button type="button" class="seeMore">⇃</button>
</div>
                        <!-- POST CONTENT ENDES-->

             <!-- POST REACTIONS -->               
    <footer class="postReactions">
      <button aria-label="Like post">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20s-6.5-4.3-8.5-7.2C1.6 10.2 2.4 7 5.5 6
           7.3 5.4 9 6.4 12 9
           15 6.4 16.7 5.4 18.5 6
           21.6 7 22.4 10.2 20.5 12.8
           18.5 15.7 12 20 12 20z"/>
</svg>

      </button>

      <button aria-label="Comment">
 <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M4 4H20C21.1 4 22 4.9 22 6V15C22 16.1 21.1 17 20 17H8L4 21V6C4 4.9 4.9 4 6 4Z"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linejoin="round"
  />
</svg>

</button>

<button aria-label="Share">
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="18" cy="5" r="3" />
  <circle cx="6" cy="12" r="3" />
  <circle cx="18" cy="19" r="3" />
  <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
  <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
</svg>

</button>

    </footer>
                 <!-- POST REACTIONS ENDS-->               
      `;
  postedContentSection.prepend(postArticle);

  const postContainer = postArticle.querySelector(".postContainer");
  const seeMoreBtn = postArticle.querySelector(".seeMore");

  //See more button logic
  if (postContainer.scrollHeight > postContainer.clientHeight) {
    seeMoreBtn.classList.add("show");
    postContainer.style.paddingBottom = "35px";
  } else {
    seeMoreBtn.classList.add("hide");
  }

  seeMoreBtn.addEventListener("click", () => {
    const isClicked = postContainer.classList.toggle("clicked");
    seeMoreBtn.textContent = isClicked ? "—" : "⇃";
  });

  const deleteBtn = postArticle.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    if (!confirm("Delete this post?")) return;
    postArticle.remove();

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
  });
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
