// Hero Carousel
new Swiper(".heroSwiper", {
  loop: true,
  autoplay: {
    delay: 4000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "fade",
});

// Plans Carousel
new Swiper(".plansSwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});




$(document).ready(function () {
  $('.slick-partners').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 }
      }
    ]
  });
});
document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".content-box").forEach(c => c.classList.remove("show"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".quote-form");
  form.classList.add("fade-in");
});



  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

   const featureSwiper = new Swiper('.features-swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });

document.addEventListener("scroll", () => {

  /* Timeline Animation */
  const section = document.querySelector(".life-insurance-process");
  const progress = document.querySelector(".timeline-progress");
  const steps = document.querySelectorAll(".timeline-step");

  if (!section) return;

  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight - 150) {
    steps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add("active");
        progress.style.width = ((index + 1) / steps.length) * 100 + "%";
      }, index * 700);
    });
  }

  /* Claim Steps Animation */
  document.querySelectorAll(".claim-steps .step").forEach((step, i) => {
    const stepRect = step.getBoundingClientRect();
    if (stepRect.top < windowHeight - 100) {
      setTimeout(() => step.classList.add("show"), i * 300);
    }
  });

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
  
document.addEventListener("DOMContentLoaded", function () {
    const quoteForm = document.querySelector(".quote-form");

    quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
          fullName: quoteForm.querySelector('input[name="fullName"]').value,
          age: parseInt(quoteForm.querySelector('input[name="age"]').value),
          monthlyIncome: parseFloat(quoteForm.querySelector('input[name="monthlyIncome"]').value),
          mobile: quoteForm.querySelector('input[name="mobile"]').value,
          email: quoteForm.querySelector('input[name="email"]').value, 
          planType: quoteForm.querySelector('select[name="planType"]').value
      };

        fetch("http://localhost:8080/api/quote/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            quoteForm.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong. Please try again.");
        });
    });
});


