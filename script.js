// $(document).ready(function () {

//   /* =========================
//      Slick Carousels
//   ========================== */

//   $('.slick-carousel').slick({
//     dots: true,
//     infinite: true,
//     speed: 800,
//     fade: true,
//     cssEase: 'linear',
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: true
//   });

//   $('.slick-why-carousel').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3500,
//     arrows: false,
//     dots: true,
//     responsive: [
//       { breakpoint: 992, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } }
//     ]
//   });

//   /* Testimonials – 3 visible */
//   $('.slick-testimonial-carousel').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//     dots: true,
//     responsive: [
//       { breakpoint: 992, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } }
//     ]
//   });

//   $('.slick-partners').slick({
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   arrows: false,
//   dots: false,
//   responsive: [
//     { breakpoint: 1200, settings: { slidesToShow: 4 } },
//     { breakpoint: 992, settings: { slidesToShow: 3 } },
//     { breakpoint: 576, settings: { slidesToShow: 2 } }
//   ]
// });

// const counters = document.querySelectorAll('.counter');
// counters.forEach(counter => {
//   const updateCount = () => {
//     const target = +counter.getAttribute('data-target');
//     const count = +counter.innerText;
//     const speed = 200; // lower = faster
//     const increment = target / speed;

//     if(count < target) {
//       counter.innerText = Math.ceil(count + increment);
//       setTimeout(updateCount, 15);
//     } else {
//       counter.innerText = target;
//     }
//   };
//   updateCount();
// });


//    const swiper = new Swiper('.testimonial-swiper', {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//   });
// });


// /* =========================
//    Tabs Functionality
// ========================== */

// document.addEventListener("DOMContentLoaded", () => {
//   const tabs = document.querySelectorAll('.tab');
//   const carousels = document.querySelectorAll('.carousel');

//   tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//       tabs.forEach(t => t.classList.remove('active'));
//       carousels.forEach(c => c.classList.remove('active'));

//       tab.classList.add('active');
//       document.getElementById(tab.dataset.target)?.classList.add('active');
//     });
//   });
// });


// /* =========================
//    Scroll Reveal (Intersection Observer)
// ========================== */

// const revealElements = document.querySelectorAll('.reveal');

// const observer = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('active');
//       observer.unobserve(entry.target); // animate once
//     }
//   });
// }, {
//   threshold: 0.15
// });

// revealElements.forEach(el => observer.observe(el));

$(document).ready(function () {

  /* =========================
     Slick Carousels
  ========================== */

  // Hero Carousel
  $('.slick-carousel').slick({
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true
  });
  $('.hero-carousel').on('afterChange', function () {
    // Disable focus on all slides
    $('.carousel-slide').attr('inert', true);

    // Enable focus only on active slide
    $('.slick-active').removeAttr('inert');
  });

  $('.slick-why-carousel').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

  // Partners / Banks Carousel
  $('.slick-partners').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } }
    ]
  });

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

  /* =========================
     Swiper Testimonials
  ========================== */
  const swiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  /* =========================
     Tabs Functionality
  ========================== */
  const tabs = document.querySelectorAll('.tab');
  const carousels = document.querySelectorAll('.carousel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      carousels.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetCarousel = document.getElementById(tab.dataset.target);
      if(targetCarousel) targetCarousel.classList.add('active');
    });
  });

  /* =========================
     Scroll Reveal / Animation
  ========================== */
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

  /* =========================
     Counters Animation
  ========================== */
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const speed = 200; // lower = faster
          const increment = target / speed;
          if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => counterObserver.observe(counter));

});

function calculateEMI() {
  const P = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("interestRate").value);
  const years = parseFloat(document.getElementById("tenure").value);
  
  if(isNaN(P) || isNaN(annualRate) || isNaN(years)) return;
  
  const r = annualRate / 12 / 100; // monthly interest rate
  const n = years * 12; // number of months
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  
  document.getElementById("emiResult").innerText = "₹" + emi.toFixed(2);
}

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


