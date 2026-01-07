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
   Business Loan EMI Calculator
========================= */
const businessLoanSlider = document.getElementById("businessLoanSlider");
const businessRateSlider = document.getElementById("businessRateSlider");
const businessTenureSlider = document.getElementById("businessTenureSlider");

const businessLoanValue = document.getElementById("businessLoanValue");
const businessRateValue = document.getElementById("businessRateValue");
const businessTenureValue = document.getElementById("businessTenureValue");

const businessEmiResult = document.getElementById("businessEmiResult");
const businessTotalResult = document.getElementById("businessTotalResult");

let businessEmiChart;

function calculateBusinessEMI() {
  const P = +businessLoanSlider.value;
  const annualRate = +businessRateSlider.value;
  const years = +businessTenureSlider.value;

  const r = annualRate / 12 / 100; // monthly interest rate
  const n = years * 12;             // total months

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const interest = totalPayable - P;

  // Update slider values
  businessLoanValue.textContent = P.toLocaleString("en-IN");
  businessRateValue.textContent = annualRate.toFixed(2);
  businessTenureValue.textContent = years;

  // Update results
  businessEmiResult.textContent = emi.toFixed(0).toLocaleString("en-IN");
  businessTotalResult.textContent = totalPayable.toFixed(0).toLocaleString("en-IN");

  // Update chart
  updateBusinessChart(P, interest);
}

function updateBusinessChart(principal, interest) {
  const totalPayable = principal + interest;

  if (businessEmiChart) businessEmiChart.destroy();

  businessEmiChart = new Chart(document.getElementById("businessEmiChart"), {
    type: "doughnut",
    data: {
      labels: ["Principal", "Interest", "Total Payable"],
      datasets: [{
        data: [principal, interest, totalPayable],
        backgroundColor: ["#6fd6c5", "#9b6be3", "#f6c23e"]
      }]
    },
    options: {
      cutout: "65%",
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;
              return `${context.label}: ₹${value.toLocaleString("en-IN")}`;
            }
          }
        },
        datalabels: {
          color: "#000",
          formatter: function(value) {
            return `₹${value.toLocaleString("en-IN")}`;
          },
          font: { weight: "bold", size: 12 }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}

// Event listeners
[businessLoanSlider, businessRateSlider, businessTenureSlider].forEach(slider => slider.addEventListener("input", calculateBusinessEMI));
calculateBusinessEMI();


/* =========================
   Business Loan Eligibility Calculator
========================= */
let businessEligibilityChart;

function calculateBusinessEligibility() {
  const businessAge = +document.getElementById("businessAge").value;
  const tenure = +document.getElementById("businessEligibilityTenure").value;
  const income = +document.getElementById("businessIncome").value;
  const existingEmi = +document.getElementById("businessExistingEmi").value;
  const rate = +document.getElementById("businessInterestRate").value;

  if (!income || !tenure || !businessAge) return;

  // Max EMI allowed = 50% of net monthly business income minus existing EMIs
  const maxEmi = income * 0.5 - existingEmi;

  // Eligible Loan = EMI × total months (n = tenure*12)
  const n = tenure * 12;
  const r = rate / 12 / 100;
  const eligibleLoan = (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  document.getElementById("businessEligibleAmount").textContent =
    eligibleLoan > 0 ? eligibleLoan.toLocaleString("en-IN") : "0";

  // Update circular chart
  if (businessEligibilityChart) businessEligibilityChart.destroy();
  businessEligibilityChart = new Chart(document.getElementById("businessEligibilityChart"), {
    type: "doughnut",
    data: {
      labels: ["Eligible Loan", "Remaining"],
      datasets: [{
        data: [eligibleLoan, 20000000 - eligibleLoan], // assuming max 2Cr
        backgroundColor: ["#6fd6c5", "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;
              return `₹${value.toLocaleString("en-IN")}`;
            }
          }
        },
        datalabels: { display: false }
      }
    },
    plugins: [ChartDataLabels]
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


