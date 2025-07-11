// Header ombré dès qu’on scrolle 50 px
window.addEventListener('scroll', () => {
  document.getElementById('site-header')
          .classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
  const burger   = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  // Toggle menu burger
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  // Ferme le menu mobile au clic
  navItems.forEach(link =>
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burger.classList.remove('open');
    })
  );

  // Met à jour le lien actif
  const updateActiveSection = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop,
            h   = sec.offsetHeight;
      if (window.scrollY >= top - 70 && window.scrollY < top + h - 70) {
        current = sec.id;
      }
    });
    navItems.forEach(link => {
      link.classList.toggle(
        'active-section',
        link.getAttribute('href').includes(`#${current}`)
      );
    });
  };

  updateActiveSection();               // <<< déclenchement initial
  window.addEventListener('scroll', updateActiveSection);
});

window.addEventListener('scroll', function () {
  const header = document.getElementById('site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});