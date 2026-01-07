const reveals = document.querySelectorAll(".reveal");
    window.addEventListener("scroll", () => {
      for (const reveal of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if(elementTop < windowHeight - revealPoint) {
          reveal.classList.add("active");
        }
      }
    });
    const timeline = document.querySelector(".timeline-wrapper");
  const progressLine = document.querySelector(".timeline-progress");
  const steps = document.querySelectorAll(".timeline-step");

  window.addEventListener("scroll", () => {
    const timelineTop = timeline.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if(timelineTop < windowHeight - 100) {
      // Animate line slowly
      const totalHeight = timeline.scrollHeight;
      progressLine.style.height = totalHeight + "px";

      // Reveal steps one by one slowly
      steps.forEach((step, index) => {
        setTimeout(() => step.classList.add("active"), index * 800); // slower stagger
      });
    }
  });

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

// Toggle mobile menu when hamburger clicked
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Mobile Dropdown Toggle
const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');

dropdownBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent link navigation
    const parent = btn.parentElement;
    parent.classList.toggle('active'); // Open/close submenu
  });
});

// Close mobile menu when any link (except dropdown buttons) is clicked
const mobileLinks = mobileNav.querySelectorAll('a');

mobileLinks.forEach(link => {
  if (!link.classList.contains('mobile-dropdown-btn')) { // Ignore dropdown buttons
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  }
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: e.target[0].value,
    email: e.target[1].value,
    phone: e.target[2].value,
    service: e.target[3].value
  };

  const res = await fetch("http://localhost:8080/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert(await res.text());
});

$(document).ready(function(){

$('#newsletterForm').on('submit', function(e){
      e.preventDefault();
      alert('Thank you for subscribing!');
      this.reset();
    });

    // Blog categories filter (dummy)
    $('.blog-categories button').click(function(){
      $('.blog-categories button').removeClass('active');
      $(this).addClass('active');
      let category = $(this).data('category');
    });
  });
  