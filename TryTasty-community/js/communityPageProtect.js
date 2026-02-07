import { onUserAuthChange } from "./../../v3/js/auth.js";

function notLoggedInModal() {
  const div = document.createElement("div");
  div.className = "notLoggedInModal";
  div.innerHTML = `
      <div class="modalContentContainer">
<h2>User Not logged in</h2>
<p>Please login to view this page.</p>
<a class="loginBtn" href="../v3/login.html">Login</a>
</div>
`;
  const main = document.querySelector("main");

  setTimeout(() => {
    main.appendChild(div);
  }, 1000);
}

// Listen for auth state changes
onUserAuthChange((user) => {
  if (!user) {
    notLoggedInModal();
  }
});
