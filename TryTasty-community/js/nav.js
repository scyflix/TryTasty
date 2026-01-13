const sidebar = document.querySelector(".sidebar")
const menuIcon = document.querySelectorAll(".menuIcon")

export function sidebarFunc() {
      sidebar.classList.toggle("show")
}

menuIcon.forEach((icon) => {
icon.addEventListener("click", () => {
      sidebarFunc()
})
})