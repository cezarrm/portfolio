/* ============================================================
   i18n.js — Troca de idioma EN / PT-BR, compartilhado entre
   todas as páginas. Persiste a escolha em localStorage.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var current = localStorage.getItem('lang') || 'pt';
  var buttons = document.querySelectorAll('[data-lang]');

  function applyLang(lang) {
    document.documentElement.classList.toggle('lang-en', lang === 'en');
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');

    buttons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem('lang', lang); } catch (e) { /* noop */ }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  applyLang(current);
});
