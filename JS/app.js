// Insert current year
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Calendly popup bindings
  document.querySelectorAll('[data-calendly]').forEach(btn => {
    btn.addEventListener('click', e => {
      const url = e.currentTarget.dataset.calendly;
      if (!url) return;
      Calendly.initPopupWidget({ url });
      return false;
    });
  });

  // Hero / main book button: open first barber as example
  document.getElementById('hero-book').addEventListener('click', () => {
    // fallback: first barber link
    const first = document.querySelector('[data-calendly]');
    if (first) {
      Calendly.initPopupWidget({ url: first.dataset.calendly });
    }
  });
  document.getElementById('book-main').addEventListener('click', (e) => {
    e.preventDefault();
    const first = document.querySelector('[data-calendly]');
    if (first) {
      Calendly.initPopupWidget({ url: first.dataset.calendly });
    }
  });
});
