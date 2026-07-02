// Sticky navbar highlight + mobile menu
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const backToTop = document.getElementById('backToTop');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Back to top visibility
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Intersection Observer – animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.timeline-card, .edu-card, .skill-group, .project-card, .achieve-block, .pub-year-group, .talks-block, .contact-card, .stat-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Apply in-view style
const styleSheet = document.createElement('style');
styleSheet.textContent = '.in-view { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(styleSheet);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

// Add active style dynamically
const activeStyle = document.createElement('style');
activeStyle.textContent = '.nav-links a.active { color: var(--primary); background: var(--bg-alt); }';
document.head.appendChild(activeStyle);
