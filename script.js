'use strict';

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Highlight the nav link for the section in view
const navAnchors = links ? [...links.querySelectorAll('a[href^="#"]')] : [];
if (navAnchors.length && 'IntersectionObserver' in window) {
  const byId = new Map(navAnchors.map((a) => [a.getAttribute('href').slice(1), a]));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navAnchors.forEach((a) => a.classList.remove('active'));
        const a = byId.get(entry.target.id);
        if (a) a.classList.add('active');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

// Image lightbox for certificates and screenshots
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const img = document.getElementById('lbImg');
  const caption = document.getElementById('lbCaption');
  const close = () => (typeof lightbox.close === 'function' ? lightbox.close() : lightbox.removeAttribute('open'));

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-full]');
    if (!trigger) return;
    img.src = trigger.dataset.full;
    img.alt = trigger.dataset.caption || '';
    caption.textContent = trigger.dataset.caption || '';
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
    else lightbox.setAttribute('open', '');
  });
  lightbox.querySelector('.lb-close').addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
