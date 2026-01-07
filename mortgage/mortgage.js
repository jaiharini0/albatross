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


 // Toggle between calculators
  const tabs = document.querySelectorAll('.calc-tab');
  const calculators = document.querySelectorAll('.calculator');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      calculators.forEach(calc => calc.classList.remove('active'));
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

/* =========================
   Mortgage Loan EMI Calculator
========================= */
const mortgageLoanSlider = document.getElementById("mortgageLoanSlider");
const mortgageRateSlider = document.getElementById("mortgageRateSlider");
const mortgageTenureSlider = document.getElementById("mortgageTenureSlider");

const mortgageLoanValue = document.getElementById("mortgageLoanValue");
const mortgageRateValue = document.getElementById("mortgageRateValue");
const mortgageTenureValue = document.getElementById("mortgageTenureValue");

const mortgageEmiResult = document.getElementById("mortgageEmiResult");
const mortgageTotalResult = document.getElementById("mortgageTotalResult");

let mortgageEmiChart;

function calculateMortgageEMI() {
  const P = +mortgageLoanSlider.value;
  const annualRate = +mortgageRateSlider.value;
  const years = +mortgageTenureSlider.value;

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const interest = totalPayable - P;

  mortgageLoanValue.textContent = P.toLocaleString("en-IN");
  mortgageRateValue.textContent = annualRate.toFixed(2);
  mortgageTenureValue.textContent = years;

  mortgageEmiResult.textContent = emi.toFixed(0).toLocaleString("en-IN");
  mortgageTotalResult.textContent = totalPayable.toFixed(0).toLocaleString("en-IN");

  updateMortgageChart(P, interest);
}

function updateMortgageChart(principal, interest) {
  if (mortgageEmiChart) mortgageEmiChart.destroy();

  mortgageEmiChart = new Chart(document.getElementById("mortgageEmiChart"), {
    type: "doughnut",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ["#4e73df", "#f6c23e"]
      }]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: ctx => `₹${ctx.raw.toLocaleString("en-IN")}`
          }
        },
        datalabels: { display: false }
      }
    }
  });
}

[mortgageLoanSlider, mortgageRateSlider, mortgageTenureSlider]
  .forEach(slider => slider.addEventListener("input", calculateMortgageEMI));

calculateMortgageEMI();


/* =========================
   Mortgage Loan Eligibility Calculator
========================= */
let mortgageEligibilityChart;

function calculateMortgageEligibility() {
  const age = +document.getElementById("mortgageAge").value;
  const tenure = +document.getElementById("mortgageEligibilityTenure").value;
  const income = +document.getElementById("mortgageIncome").value;
  const existingEmi = +document.getElementById("mortgageExistingEmi").value;
  const rate = +document.getElementById("mortgageInterestRate").value;

  if (!income || !tenure || !age) return;

  // FOIR up to 60% for LAP
  const maxEmi = income * 0.6 - existingEmi;
  const n = tenure * 12;
  const r = rate / 12 / 100;

  const eligibleLoan =
    (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  document.getElementById("mortgageEligibleAmount").textContent =
    eligibleLoan > 0 ? eligibleLoan.toLocaleString("en-IN") : "0";

  if (mortgageEligibilityChart) mortgageEligibilityChart.destroy();

  mortgageEligibilityChart = new Chart(document.getElementById("mortgageEligibilityChart"), {
    type: "doughnut",
    data: {
      labels: ["Eligible Loan", "Remaining"],
      datasets: [{
        data: [eligibleLoan, 50000000 - eligibleLoan], // up to 5 Cr
        backgroundColor: ["#1cc88a", "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "75%",
      plugins: {
        legend: { display: false },
        datalabels: { display: false }
      }
    }
  });
}

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

  const steps = document.querySelectorAll('.timeline-step');
const progress = document.querySelector('.timeline-progress');

let current = 0;

function animateJourney() {
  if (current >= steps.length) return;

  const step = steps[current];

  // Mark reached
  step.classList.add('active');

  // Trigger pulse (enlarge)
  step.classList.add('pulse');

  // Move line slowly
  const percent = (current / (steps.length - 1)) * 100;
  progress.style.width = percent + '%';

  // Remove pulse after short delay (return to normal size)
  setTimeout(() => {
    step.classList.remove('pulse');
  }, 500);

  current++;

  // Move to next step slowly
  setTimeout(animateJourney, 1600);
}

/* Start animation when visible */
const processObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateJourney();
    processObserver.disconnect();
  }
}, { threshold: 0.4 });

processObserver.observe(document.querySelector('.loan-process'));

const toggleButtons = document.querySelectorAll(".toggle-btn");
  const contentBoxes = document.querySelectorAll(".content-box");

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      toggleButtons.forEach(b => b.classList.remove("active"));
      contentBoxes.forEach(box => box.classList.remove("show"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.target).classList.add("show");
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

