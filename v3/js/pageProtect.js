import { onUserAuthChange } from "./auth.js";

function notLoggedInModal() {
      const div = document.createElement("div")
      div.className = "notLoggedInModal"
      div.innerHTML = `
      <div class="modalContentContainer">
<h2>User Not logged in</h2>
<p>Please login to view this page.</p>
<a class="loginBtn" href="login.html">Login</a>
</div>
`
const main = document.querySelector("main")

  main.appendChild(div)
}

// Listen for auth state changes
onUserAuthChange((user) => {
  if (!user) {
      notLoggedInModal()
  } 
});