
document.addEventListener("DOMContentLoaded", () => {
  const role = document.body.dataset.role;
  const params = new URLSearchParams(window.location.search);
  const rawEmail = params.get("email");
  const email = typeof rawEmail === "string" ? rawEmail.trim() : "";

  // Stateless identity: the email is passed only in the current URL.
  const displayEmail = email || "guest@stackly.com";
  const safeInitial = displayEmail.charAt(0).toUpperCase() || "G";
  const initial = safeInitial;

  document.querySelectorAll("[data-dashboard-email]").forEach(el => {
    el.textContent = displayEmail;
  });
  document.querySelectorAll("[data-user-initial]").forEach(el => {
    el.textContent = initial;
  });
  document.querySelectorAll("[data-user-role]").forEach(el => {
    el.textContent = role || "";
  });

  const sidebar = document.querySelector(".dashboard-sidebar");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const closeButton = document.querySelector("[data-menu-close]");
  const overlay = document.querySelector(".dashboard-overlay");

  const closeMenu = () => {
    sidebar?.classList.remove("is-open");
    overlay?.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    sidebar?.classList.add("is-open");
    overlay?.classList.add("is-visible");
    document.body.classList.add("menu-open");
  };

  menuButton?.addEventListener("click", openMenu);
  closeButton?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  document.querySelectorAll(".dashboard-nav a").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".dashboard-nav a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
      closeMenu();
    });
  });

  // Each sidebar tab controls a real content panel.
  const panels = [...document.querySelectorAll(".dashboard-panel")];
  const tabs = [...document.querySelectorAll(".dashboard-nav a[data-panel]")];

  const activatePanel = (id, updateHash = true) => {
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.panel === id));
    panels.forEach(panel => panel.classList.toggle("is-active", panel.id === id));
    const heading = document.querySelector("[data-current-section]");
    const active = tabs.find(tab => tab.dataset.panel === id);
    if (heading && active) heading.textContent = active.dataset.label;
    if (updateHash) history.replaceState(null, "", `#${id}`);
    closeMenu();
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();
      activatePanel(tab.dataset.panel);
    });
  });

  const firstPanel = location.hash.replace("#", "");
  activatePanel(
    panels.some(panel => panel.id === firstPanel) ? firstPanel : "overview",
    Boolean(firstPanel)
  );

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (panels.some(panel => panel.id === id)) activatePanel(id, false);
  });

  document.querySelectorAll("[data-logout]").forEach(button => {
    button.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  });

  // Dashboard CTAs are intentionally demo-only: every action CTA goes to the custom 404 page.
  // Navigation tabs, hamburger/close controls, logo links and logout remain functional.
  document.querySelectorAll("[data-cta-404], .dashboard-action").forEach(cta => {
    cta.addEventListener("click", event => {
      event.preventDefault();
      window.location.href = "404.html";
    });
  });

});
