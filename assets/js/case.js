/* ============================================================
   case.js — Scripts compartilhados entre as páginas de Case Study
   e a página About
   ============================================================ */

// ─── SCROLL REVEAL ────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

// ─── COMPARE SLIDER: antes / depois ─────────────────────────
document.querySelectorAll('.compare-slider').forEach(slider => {
  const range = slider.querySelector('.compare-slider__range');
  if (!range) return;

  const update = () => slider.style.setProperty('--pos', `${range.value}%`);
  range.addEventListener('input', update);
  update();
});

// ─── NEXT PROJECT: pula automaticamente os "em breve" ──────
// Única fonte de verdade da ordem/estado dos cases. Quando um projeto
// sair do "em breve" (ou entrar), basta mudar `soon` aqui — o link de
// "próximo projeto" em todas as páginas se ajusta sozinho.
const CASE_PROJECTS = [
  { slug: 'case_easylaser.html', pt: 'EasyLaser', ptSub: 'Clínica de Estética', en: 'EasyLaser', enSub: 'Aesthetics Clinic', soon: false },
  { slug: 'case_ferramentasgerais.html', pt: 'Ferramentas Gerais', ptSub: 'E-commerce B2B', en: 'Ferramentas Gerais', enSub: 'B2B E-commerce', soon: true },
  { slug: 'case_wave.html', pt: 'Wave', ptSub: 'Gateway de Pagamentos', en: 'Wave', enSub: 'Payment Gateway', soon: true },
  { slug: 'case_topzstone.html', pt: 'Topzstone', ptSub: 'Branding e Editorial', en: 'Topzstone', enSub: 'Branding and Editorial', soon: false },
  { slug: 'case_tevalabs.html', pt: 'TevaLabs', ptSub: 'Design System de PPT', en: 'TevaLabs', enSub: 'PPT Design System', soon: true },
  { slug: 'case_positivo.html', pt: 'University Positivo', ptSub: 'Guia de Carreira', en: 'University Positivo', enSub: 'Career Guide', soon: false },
];

const nextLink = document.querySelector('.case-next__link');

if (nextLink) {
  const currentSlug = location.pathname.split('/').pop();
  const currentIndex = CASE_PROJECTS.findIndex(p => p.slug === currentSlug);

  if (currentIndex !== -1) {
    let nextIndex = (currentIndex + 1) % CASE_PROJECTS.length;
    let guard = 0;

    // avança até achar o próximo projeto que não esteja "em breve"
    while (CASE_PROJECTS[nextIndex].soon && guard < CASE_PROJECTS.length) {
      nextIndex = (nextIndex + 1) % CASE_PROJECTS.length;
      guard++;
    }

    const next = CASE_PROJECTS[nextIndex];
    nextLink.href = next.slug;

    const ptEl = nextLink.querySelector('.t-pt');
    const enEl = nextLink.querySelector('.t-en');

    if (ptEl) ptEl.innerHTML = `${next.pt} <span class="highlight">— ${next.ptSub}</span>`;
    if (enEl) enEl.innerHTML = `${next.en} <span class="highlight">— ${next.enSub}</span>`;
  }
}

// ─── LIGHTBOX: imagens do case ─────────────────────────────
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');

  document.querySelectorAll('.case-hero-media img, .case-screen__frame img, .case-content img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
