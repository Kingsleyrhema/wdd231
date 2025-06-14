// main.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    const opened = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', opened);
  });

  // Wayfinding: highlight current link
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
});
