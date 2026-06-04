/* Skorosys.ai — Main JS */

// Nav scroll effect
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
const navCta    = document.querySelector('.nav-cta');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    navCta?.classList.toggle('open');
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Animated counter
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        io2.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io2.observe(el));
}

// Skill bars animate
const skillFills = document.querySelectorAll('.skill-fill');
if (skillFills.length) {
  const io3 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        io3.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(el => { el.style.width = '0'; io3.observe(el); });
}

// Active nav link highlight
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
