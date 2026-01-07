// Simple fade-in on scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".feature-card, .testimonial");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
});

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

// Toggle mobile menu when hamburger clicked
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Close mobile menu when any link inside it is clicked
const mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });
});