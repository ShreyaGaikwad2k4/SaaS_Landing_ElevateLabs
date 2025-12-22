// script.js - frontend behavior

// Mobile Navbar Toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});





// New updated signup js
// ===== Signup Form Validation (Production-ready) =====
const form = document.getElementById('signupForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('signupBtn');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[a-zA-Z ]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function showMessage(message, isError = false) {
  formMsg.textContent = message;
  formMsg.classList.remove('hidden');
  formMsg.classList.toggle('text-red-600', isError);
  formMsg.classList.toggle('text-green-600', !isError);
}

function resetButton() {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Create Account';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMsg.classList.add('hidden');

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Validating...';

  // ===== VALIDATIONS =====
  if (name.length < 3 || !namePattern.test(name)) {
    showMessage('Enter a valid full name (minimum 3 letters).', true);
    return resetButton();
  }

  if (!emailPattern.test(email)) {
    showMessage('Enter a valid email address (example: you@example.com).', true);
    return resetButton();
  }

  if (!passwordPattern.test(password)) {
    showMessage(
      'Password must be at least 8 characters and include letters and numbers.',
      true
    );
    return resetButton();
  }

   // ===== Send data to backend =====
  showMessage('Validation successful. Connecting to server...', false);

  try {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.error || 'Signup failed.', true);
      return resetButton();
    }

    showMessage(data.message || 'Verification email sent. Check inbox.', false);
    form.reset();
    resetButton();

  } catch (err) {
    showMessage('Network error. Try again.', true);
    resetButton();
  }
});




//========================================================================
//Thankyou.html JS 
//========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Optional greeting from query string
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  if (name) {
    const greetEl = document.getElementById("greet");
    if (greetEl) greetEl.textContent = `Thanks, ${name}! Your journey begins now 🚀`;
  }

  // Ensure the "Go to Dashboard" link actually points to dashboard.html
  const goLink = document.querySelector('a[href="thank-dashboard.html"]');
  if (goLink) {
    goLink.setAttribute('href', 'dashboard.html');
    // also make the click deterministic (prevents accidental fallback)
    goLink.addEventListener('click', (ev) => {
      ev.preventDefault();
      window.location.href = 'dashboard.html';
    });
  }

  // Countdown logic
  const counterEl = document.getElementById("counter");
  if (!counterEl) return; // nothing to do

  let sec = parseInt(counterEl.textContent, 10);
  if (Number.isNaN(sec)) sec = 10; // fallback

  const tick = () => {
    if (sec > 1) {
      sec = sec - 1;
      counterEl.textContent = sec;
      return;
    }

    // when 1 -> become "Redirecting…" then navigate after 2s
    if (sec === 1) {
      counterEl.textContent = 'Redirecting…';
      clearInterval(intervalId);
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    }
  };

  // Start after 1 second so initial value (e.g. 10) stays visible
  const intervalId = setInterval(tick, 1000);
});
