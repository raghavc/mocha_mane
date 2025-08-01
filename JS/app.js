// app.js

// Map weekday index (0=Sunday) to hours string
const HOURS_MAPPING = {
  0: '11AM–4PM',   // Sunday
  1: 'Closed',     // Monday
  2: '1PM–8PM',    // Tuesday
  3: '1PM–8PM',    // Wednesday
  4: '10AM–8PM',   // Thursday
  5: '10AM–8PM',   // Friday
  6: '8AM–6PM'     // Saturday
};

// Utility: safely init Calendly popup if available
function openCalendly(url) {
  if (typeof Calendly === 'undefined' || !url) {
    console.warn('Calendly widget not loaded or URL missing:', url);
    return;
  }
  Calendly.initPopupWidget({ url });
}

// Inject current year into footer
function injectYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// Insert today's hours into any placeholder (optional enhancement)
function showTodaysHours() {
  const today = new Date().getDay(); // 0 = Sunday
  const hoursText = HOURS_MAPPING[today] || '';
  // find any element with data-todays-hours and populate
  document.querySelectorAll('[data-todays-hours]').forEach(el => {
    el.textContent = hoursText;
  });
  // Example: if you want to inject into hero location card manually:
  const locationCard = document.querySelector('.location-card');
  if (locationCard) {
    const existing = locationCard.querySelector('.today-hours');
    if (!existing) {
      const p = document.createElement('p');
      p.className = 'today-hours';
      p.innerHTML = `<strong>Hours (today):</strong> ${hoursText}`;
      locationCard.appendChild(p);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectYear();
  showTodaysHours();

  // Bind Calendly popup to any element with data-calendly
  document.querySelectorAll('[data-calendly]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = e.currentTarget.dataset.calendly;
      openCalendly(url);
    });
  });

  // Hero/main booking buttons fallback to first barber link
  const heroBtn = document.getElementById('hero-book');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const first = document.querySelector('[data-calendly]');
      if (first) openCalendly(first.dataset.calendly);
    });
  }
  const bookMain = document.getElementById('book-main');
  if (bookMain) {
    bookMain.addEventListener('click', e => {
      e.preventDefault();
      const first = document.querySelector('[data-calendly]');
      if (first) openCalendly(first.dataset.calendly);
    });
  }
});
