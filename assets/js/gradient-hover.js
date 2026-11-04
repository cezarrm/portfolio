/* ============================================================
   gradient-hover.js - Faz o azul do .gradient-highlight "seguir"
   o cursor no hover (só em telas com ponteiro fino, ou seja,
   desktop - em touch a media query nem casa). A animação
   automática é pausada e o gradiente vira um radial-gradient
   centralizado em --mx/--my (definidos em global.css), que a
   gente atualiza aqui conforme o mouse se move sobre o texto.
   Compartilhado entre todas as páginas.
   ============================================================ */

(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.gradient-highlight').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      x = Math.min(100, Math.max(0, x));
      y = Math.min(100, Math.max(0, y));
      el.style.setProperty('--mx', x + '%');
      el.style.setProperty('--my', y + '%');
    });

    el.addEventListener('mouseleave', function () {
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    });
  });
})();
