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

// ------------------------
// Personal Loan EMI Calculator
// ------------------------
const personalLoanSlider = document.getElementById("personalLoanSlider");
const personalRateSlider = document.getElementById("personalRateSlider");
const personalTenureSlider = document.getElementById("personalTenureSlider");

const personalLoanValue = document.getElementById("personalLoanValue");
const personalRateValue = document.getElementById("personalRateValue");
const personalTenureValue = document.getElementById("personalTenureValue");

const personalEmiResult = document.getElementById("personalEmiResult");
const personalTotalResult = document.getElementById("personalTotalResult");

let personalEmiChart;

function calculatePersonalEMI() {
  const P = +personalLoanSlider.value;
  const annualRate = +personalRateSlider.value;
  const years = +personalTenureSlider.value;

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const interest = totalPayable - P;

  personalLoanValue.textContent = P.toLocaleString("en-IN");
  personalRateValue.textContent = annualRate.toFixed(2);
  personalTenureValue.textContent = years;

  personalEmiResult.textContent = emi.toFixed(0).toLocaleString("en-IN");
  personalTotalResult.textContent = totalPayable.toFixed(0).toLocaleString("en-IN");

  // Update Pie Chart
  if (personalEmiChart) personalEmiChart.destroy();

  personalEmiChart = new Chart(document.getElementById("personalEmiChart"), {
    type: "doughnut",
    data: {
      labels: ["Principal Amount", "Total Interest"],
      datasets: [{
        data: [P, interest],
        backgroundColor: ["#6fd6c5", "#f6c23e"]
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
        }
      }
    }
  });
}

[personalLoanSlider, personalRateSlider, personalTenureSlider].forEach(slider => slider.addEventListener("input", calculatePersonalEMI));
calculatePersonalEMI();


// ------------------------
// Personal Loan Eligibility Calculator
// ------------------------
let personalEligibilityChart;

function calculatePersonalEligibility() {
  const age = +document.getElementById("personalAge").value;
  const tenure = +document.getElementById("personalEligibilityTenure").value;
  const income = +document.getElementById("personalIncome").value;
  const existingEmi = +document.getElementById("personalExistingEmi").value;
  const rate = +document.getElementById("personalInterestRate").value;

  if (!income || !tenure || !age) return;

  // Personal Loan typical max EMI: 40% of monthly income minus existing EMIs
  const maxEmi = income * 0.4 - existingEmi;
  const eligibleLoan = maxEmi * 12 * tenure; // yearly factor

  document.getElementById("personalEligibleAmount").textContent =
    eligibleLoan > 0 ? eligibleLoan.toLocaleString("en-IN") : "0";

  // Update chart
  if (personalEligibilityChart) personalEligibilityChart.destroy();

  personalEligibilityChart = new Chart(document.getElementById("personalEligibilityChart"), {
    type: "doughnut",
    data: {
      labels: ["Eligible Loan", "Remaining"],
      datasets: [{
        data: [eligibleLoan, 5000000 - eligibleLoan], // max 50L
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
        }
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


