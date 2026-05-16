/* ============================================================
   main.js — Scripts compartilhados entre todas as páginas
   ============================================================ */

// ─── NAV: hamburger menu ──────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open');
  });

  // fecha ao clicar em um link
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
    });
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // desconecta após animar (performance)
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── HERO: scroll suave ao clicar na seta ─────────────────
const heroScroll = document.querySelector('.hero__scroll');
if (heroScroll) {
  heroScroll.addEventListener('click', () => {
    const target = document.getElementById('work');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

const roles = [
  "Product Designer",
  "Brand Designer",
  "Visual Designer"
];

const typing = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function loopTyping() {
  const current = roles[roleIndex];

  if (deleting) {
    typing.textContent = current.substring(0, charIndex--);
  } else {
    typing.textContent = current.substring(0, charIndex++);
  }

  let speed = deleting ? 50 : 90;

  if (!deleting && charIndex === current.length + 1) {
    deleting = true;
    speed = 1400;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 250;
  }

  setTimeout(loopTyping, speed);
}

loopTyping();

const cards = document.querySelectorAll('.feed__cell');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

cards.forEach(card => {
  card.addEventListener('click', () => {

    const image = card.querySelector('img');

    if (!image) return;

    lightboxImg.src = image.src;

    lightbox.classList.add('active');

    document.body.style.overflow = 'hidden';
  });
});

/* fechar clicando fora */
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');

  document.body.style.overflow = '';
});

/* fechar ESC */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');

    document.body.style.overflow = '';
  }
});