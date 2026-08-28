(() => {
  const config = window.TRICOT_CONFIG || {};
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const dialog = document.querySelector("[data-dialog]");
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  const setHeaderState = () => header?.classList.toggle("is-solid", window.scrollY > 28);
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("is-open", !isOpen);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const revealItems = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const openDialog = () => {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => dialog?.close());
  });
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submit = form.querySelector("button[type='submit']");
    const payload = {
      email: new FormData(form).get("email"),
      source: "tricot-landing",
      createdAt: new Date().toISOString(),
    };
    submit.disabled = true;
    status.textContent = "Preparando el contacto…";

    try {
      if (config.formEndpoint) {
        const response = await fetch(config.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
        status.textContent = "Solicitud enviada. Te escribiremos con el siguiente paso.";
        form.reset();
      } else {
        localStorage.setItem("tricot-contact-prototype", JSON.stringify(payload));
        status.textContent = "Email guardado localmente para revisar el prototipo.";
        openDialog();
      }
    } catch (error) {
      console.error(error);
      status.textContent = "No se pudo completar el envío. Revisa la configuración del formulario.";
    } finally {
      submit.disabled = false;
    }
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
