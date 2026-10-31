(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const closeMenu = (restoreFocus = false) => {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
    if (restoreFocus) menuToggle?.focus();
  };
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("is-open", !isOpen);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (menuToggle?.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) closeMenu();
  });
  window.matchMedia("(max-width: 760px)").addEventListener("change", () => closeMenu());
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
})();
