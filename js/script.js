// ----------------------------
// ANIMATION D'ENTRÉE DES SECTIONS AU SCROLL
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");   // on entre → on ajoute
      } else {
        entry.target.classList.remove("visible"); // on sort → on retire
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));
});


// ----------------------------
// Smooth scroll fallback + compatibilité étendue (IE/anciens Safari)
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  const yOffset = -50; // Ajuste selon la hauteur de ton header sticky

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length <= 1 || !targetId.startsWith("#")) return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      // Scroll toujours, même si déjà sur la section
      const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    });
  });
});

