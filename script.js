// ============================================================
// TROYDEV — site interactions
// ============================================================

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- MOBILE MENU ---------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileScrim = document.getElementById("mobileScrim");
const mobileClose = document.getElementById("mobileClose");

function openMobileMenu() {
  mobileMenu.classList.add("open");
  mobileScrim.classList.add("open");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  mobileScrim.classList.remove("open");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
hamburgerBtn.addEventListener("click", openMobileMenu);
mobileClose.addEventListener("click", closeMobileMenu);
mobileScrim.addEventListener("click", closeMobileMenu);
mobileMenu
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMobileMenu));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

/* ---------- SCROLL REVEAL ---------- */
function observeReveal() {
  const reveals = document.querySelectorAll(".reveal:not(.visible)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach((el) => observer.observe(el));
}
observeReveal();

window.addEventListener("load", () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("visible");
    }
  });
});

/* ---------- HEADER STATE ---------- */
const siteNav = document.getElementById("siteNav");
const heroSection = document.querySelector(".hero");

function updateNavState() {
  if (!siteNav || !heroSection) return;
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  siteNav.classList.toggle("is-scrolled", window.scrollY > heroBottom - 80);
}

window.addEventListener("scroll", updateNavState, { passive: true });
window.addEventListener("resize", updateNavState);
window.addEventListener("load", updateNavState);

/* ---------- SMOOTH SCROLL FOR IN-PAGE LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
