/* ============================================================
   SEU ANTÔNIO JANGA — cardapio.js
   Filtro por categoria + busca por texto. JavaScript puro.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g');
  var norm = function (s) {
    return (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS, '');
  };

  var filters = $$('.menu-filter');
  var cats = $$('.menu-cat');
  var items = $$('.menu-item');
  var subs = $$('.menu-sub');
  var searchInput = $('#menu-search');
  var emptyState = $('#menu-empty');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var activeFilter = 'todos';

  // índice de busca por item
  items.forEach(function (it) {
    it._text = norm((it.getAttribute('data-search') || '') + ' ' + it.textContent);
  });

  function refreshSubs() {
    subs.forEach(function (sub) {
      var visible = false;
      var node = sub.nextElementSibling;
      while (node && !node.classList.contains('menu-sub')) {
        if (node.querySelector && $$('.menu-item', node).some(function (i) { return !i.classList.contains('is-hidden'); })) {
          visible = true; break;
        }
        node = node.nextElementSibling;
      }
      sub.classList.toggle('is-hidden', !visible);
    });
  }

  function apply() {
    var q = norm(searchInput.value.trim());
    var anyVisible = false;

    items.forEach(function (it) {
      var inCat = activeFilter === 'todos' ||
        (it.closest('.menu-cat') && it.closest('.menu-cat').getAttribute('data-category') === activeFilter);
      var matches = !q || it._text.indexOf(q) !== -1;
      // busca ignora o filtro de categoria para varrer o cardápio inteiro
      var show = q ? matches : inCat;
      it.classList.toggle('is-hidden', !show);
      if (show) anyVisible = true;
    });

    cats.forEach(function (cat) {
      var catItems = $$('.menu-item', cat);
      var hasVisible = catItems.some(function (i) { return !i.classList.contains('is-hidden'); });
      cat.classList.toggle('is-hidden', !hasVisible);
    });

    refreshSubs();
    document.body.toggleAttribute('data-menu-empty', !anyVisible);
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.getAttribute('data-filter');

      // ao trocar de categoria, limpa a busca para não confundir
      if (searchInput.value) searchInput.value = '';
      apply();

      if (activeFilter !== 'todos') {
        var target = document.getElementById(activeFilter);
        if (target) {
          var top = target.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    });
  });

  var debounce;
  searchInput.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(apply, 120);
  });

  // suporte a #ancora ao chegar de outra página
  if (location.hash) {
    var f = $$('.menu-filter').filter(function (b) { return '#' + b.getAttribute('data-filter') === location.hash; })[0];
    if (f) f.click();
  }

  apply();
})();
