const menuToggle = document.querySelector("#menuToggle");
const quickNav = document.querySelector("#quickNav");

menuToggle.addEventListener("click", () => {
  const isOpen = quickNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
