// Typing effect for rotating role line
const roles = [
  "IT Support & Management",
  "Auditoria de Sistemas",
  "Análisis de Datos",
  "IA Aplicada"
];

const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 70);
}

typeLoop();

// Fade-in cards on scroll
const cards = document.querySelectorAll(".card");
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      typeCardTitle(entry.target);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

cards.forEach((card) => cardObserver.observe(card));

// Type out each card's title like a terminal command, then repeat every 5s
function typeCardTitle(card) {
  const titleEl = card.querySelector(".card-title");
  const textEl = card.querySelector(".title-text");
  if (!titleEl || !textEl) return;

  const fullText = textEl.dataset.fullText || textEl.textContent;
  textEl.dataset.fullText = fullText;

  function runTyping() {
    textEl.textContent = "";
    titleEl.classList.add("typing");

    let i = 0;
    function step() {
      i++;
      textEl.textContent = fullText.slice(0, i);
      if (i < fullText.length) {
        setTimeout(step, 28);
      } else {
        setTimeout(() => titleEl.classList.remove("typing"), 1200);
      }
    }
    step();
  }

  runTyping();
  setInterval(runTyping, 5000);
}

// Highlight active section in sidebar nav
const navLinks = document.querySelectorAll(".side-nav a");
const sections = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = document.querySelector(`.side-nav a[href="#${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting && !link.classList.contains("active")) {
      navLinks.forEach((l) => {
        l.classList.remove("active");
        l.classList.remove("flash");
      });
      link.classList.add("active");
      link.classList.add("flash");
      link.addEventListener("animationend", () => link.classList.remove("flash"), { once: true });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach((section) => navObserver.observe(section));

// Mobile sidebar toggle
const navToggle = document.getElementById("navToggle");
const sidebar = document.getElementById("sidebar");

navToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});
