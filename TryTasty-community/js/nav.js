const sidebar = document.querySelector(".sidebar")
const menuIcon = document.querySelectorAll(".menuIcon")

function sidebarFunc() {
      sidebar.classList.toggle("show")

}

menuIcon.forEach((icon) => {
icon.addEventListener("click", () => {
      sidebarFunc()
})
})