/* ============================================================
   case.js - Scripts compartilhados entre as páginas de Case Study
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
// Usa Pointer Events (mouse + touch + caneta unificados) em vez de
// depender só do <input type="range"> nativo - no iOS a área de
// toque real do range é menor que a caixa esticada via CSS, então
// o drag não respondia. O range continua aqui só como fallback
// acessível via teclado (setas, quando focado).
document.querySelectorAll('.compare-slider').forEach(slider => {
  const range = slider.querySelector('.compare-slider__range');
  let dragging = false;

  const setPosFromClientX = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.min(100, Math.max(0, pct));
    slider.style.setProperty('--pos', `${pct}%`);
    if (range) range.value = pct;
  };

  // bloqueia o gesto nativo de "arrastar imagem para fora", que no
  // Safari pode sequestrar o arraste antes do pointermove continuar
  slider.addEventListener('dragstart', (e) => e.preventDefault());

  slider.addEventListener('pointerdown', (e) => {
    dragging = true;
    if (slider.setPointerCapture) {
      try { slider.setPointerCapture(e.pointerId); } catch (err) {}
    }
    setPosFromClientX(e.clientX);
  });

  slider.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    setPosFromClientX(e.clientX);
  });

  const stopDrag = (e) => {
    dragging = false;
    if (e && slider.hasPointerCapture && slider.hasPointerCapture(e.pointerId)) {
      slider.releasePointerCapture(e.pointerId);
    }
  };

  slider.addEventListener('pointerup', stopDrag);
  slider.addEventListener('pointercancel', stopDrag);
  window.addEventListener('pointerup', stopDrag);

  // reforço com mouse events "puros" - alguns Safaris tem
  // comportamento inconsistente de Pointer Events só com mouse
  slider.addEventListener('mousedown', (e) => {
    dragging = true;
    setPosFromClientX(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    setPosFromClientX(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
  });

  if (range) {
    range.addEventListener('input', () => {
      slider.style.setProperty('--pos', `${range.value}%`);
    });
  }
});

// ─── DESIGN SYSTEM: copiar hex ao clicar no swatch ─────────
document.querySelectorAll('.case-swatch, .case-colorband').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const hex = swatch.getAttribute('data-hex') || '';

    const showCopied = () => {
      swatch.classList.add('is-copied');
      setTimeout(() => swatch.classList.remove('is-copied'), 1200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hex).then(showCopied).catch(() => {
        fallbackCopy(hex);
        showCopied();
      });
    } else {
      fallbackCopy(hex);
      showCopied();
    }
  });
});

function fallbackCopy(text) {
  const helper = document.createElement('textarea');
  helper.value = text;
  helper.style.position = 'fixed';
  helper.style.opacity = '0';
  document.body.appendChild(helper);
  helper.select();
  try { document.execCommand('copy'); } catch (err) { /* noop */ }
  document.body.removeChild(helper);
}

// ─── UI STATE CARDS: hover (desktop) / toque (mobile) ──────
// No touch não existe :hover, então o clique/toque fixa o estado
// "depois" ligando a classe is-active - no desktop isso só reforça
// o hover, permitindo também "fixar" o estado clicando.
document.querySelectorAll('.case-uistate__card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-active');
  });
});

// ─── NEXT PROJECT: pula automaticamente os "em breve" ──────
// Única fonte de verdade da ordem/estado dos cases. Quando um projeto
// sair do "em breve" (ou entrar), basta mudar `soon` aqui - o link de
// "próximo projeto" em todas as páginas se ajusta sozinho.
const CASE_PROJECTS = [
  { slug: 'case_easylaser.html', pt: 'EasyLaser', ptSub: 'Clínica de Estética', en: 'EasyLaser', enSub: 'Aesthetics Clinic', soon: false },
  { slug: 'case_ferramentasgerais.html', pt: 'Ferramentas Gerais', ptSub: 'E-commerce B2B', en: 'Ferramentas Gerais', enSub: 'B2B E-commerce', soon: false },
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

    if (ptEl) ptEl.innerHTML = `${next.pt} <span class="highlight">- ${next.ptSub}</span>`;
    if (enEl) enEl.innerHTML = `${next.en} <span class="highlight">- ${next.enSub}</span>`;
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
