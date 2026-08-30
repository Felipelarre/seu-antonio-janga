/* ============================================================
   SEU ANTÔNIO JANGA — app.js
   JavaScript puro, sem dependências obrigatórias.
   GSAP + ScrollTrigger são usados só para enriquecer o reveal
   quando disponíveis; tudo funciona sem eles.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Preloader ---------- */
  var preloader = $('#preloader');
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('is-done');
    setTimeout(function () { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 700);
  }
  window.addEventListener('load', function () { setTimeout(hidePreloader, reduceMotion ? 0 : 350); });
  // rede de segurança: nunca deixa o preloader preso
  setTimeout(hidePreloader, 4000);

  /* ---------- Ano corrente ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header sticky ---------- */
  var header = $('#site-header');
  var hasHero = !!$('.hero');
  function onScrollHeader() {
    if (!header) return;
    if (!hasHero) { header.classList.add('is-stuck'); return; }
    header.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  var navToggle = $('#nav-toggle');
  var nav = $('#nav');
  var navBackdrop = $('#nav-backdrop');

  function setNav(open) {
    document.body.classList.toggle('nav-open', open);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    if (navBackdrop) navBackdrop.hidden = !open;
    if (open) {
      var first = nav && nav.querySelector('a');
      if (first) first.focus();
    }
  }
  if (navToggle) navToggle.addEventListener('click', function () {
    setNav(!document.body.classList.contains('nav-open'));
  });
  if (navBackdrop) navBackdrop.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setNav(false);
      if (navToggle) navToggle.focus();
    }
  });

  /* ---------- Scroll suave com compensação do header ---------- */
  function scrollToTarget(hash) {
    var el = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (!el) return false;
    var top = el.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    // acessibilidade: manda o foco para a seção
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    return true;
  }
  $$('[data-scroll]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      if (scrollToTarget(href)) {
        e.preventDefault();
        if (document.body.classList.contains('nav-open')) setNav(false);
        history.replaceState(null, '', href);
      }
    });
  });

  /* ---------- Scrollspy da navegação ---------- */
  var navLinks = $$('#nav a[href^="#"]');
  var spied = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && spied.length) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spied.forEach(function (s) { spyObs.observe(s); });
  }

  /* ---------- Reveal ao entrar na viewport ---------- */
  var revealEls = $$('[data-reveal], [data-reveal-stagger]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); revObs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revObs.observe(el); });

    /* GSAP: leve parallax do hero quando presente */
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      var heroImg = $('.hero-media img');
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 12, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    }
  }

  /* ---------- Contadores ---------- */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (reduceMotion) { el.textContent = target.toFixed(decimals).replace('.', ','); return; }
    var start = performance.now(), dur = 1400;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals).replace('.', ',');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals).replace('.', ',');
    }
    requestAnimationFrame(tick);
  }
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); cObs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Horário: "aberto agora" + dia atual ---------- */
  // Seg–Sex 16:00–24:00 · Sáb 12:00–24:00 · Dom 12:00–23:00
  var SCHEDULE = { 0: [12, 23], 1: [16, 24], 2: [16, 24], 3: [16, 24], 4: [16, 24], 5: [16, 24], 6: [12, 24] };
  (function openStatus() {
    var now = new Date();
    var day = now.getDay();
    var hourFloat = now.getHours() + now.getMinutes() / 60;
    var range = SCHEDULE[day];
    var isOpen = hourFloat >= range[0] && hourFloat < range[1];
    var closeLabel = range[1] === 24 ? 'meia-noite' : range[1] + 'h';

    var msg;
    if (isOpen) {
      msg = 'Aberto agora · fecha à ' + closeLabel;
    } else if (hourFloat < range[0]) {
      msg = 'Fechado agora · abre hoje às ' + range[0] + 'h';
    } else {
      var nd = (day + 1) % 7;
      msg = 'Fechado agora · abre amanhã às ' + SCHEDULE[nd][0] + 'h';
    }

    $$('[data-open-status]').forEach(function (pill) {
      pill.classList.toggle('is-open', isOpen);
      var label = pill.querySelector('.label');
      if (label) label.textContent = msg;
    });

    var row = $('.hours-table tr[data-day="' + day + '"]');
    if (row) row.setAttribute('data-today', '');
  })();

  /* ---------- Carrossel de depoimentos ---------- */
  (function testimonials() {
    var track = $('#testi-track');
    if (!track) return;
    var slides = $$('.testi-card', track);
    var prev = $('#testi-prev'), next = $('#testi-next'), dotsWrap = $('#testi-dots');
    var index = 0, timer = null;

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dotsWrap.appendChild(b);
    });
    var dots = $$('button', dotsWrap);

    function render() {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      slides.forEach(function (s, i) { s.setAttribute('aria-hidden', String(i !== index)); });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === index);
        d.setAttribute('aria-selected', String(i === index));
      });
    }
    function go(i, userAction) {
      index = (i + slides.length) % slides.length;
      render();
      if (userAction) restart();
    }
    function auto() { if (!reduceMotion) timer = setInterval(function () { go(index + 1); }, 6500); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); auto(); }

    if (prev) prev.addEventListener('click', function () { go(index - 1, true); });
    if (next) next.addEventListener('click', function () { go(index + 1, true); });

    var wrap = $('.testi');
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', auto);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', auto);
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(index - 1, true); }
      if (e.key === 'ArrowRight') { go(index + 1, true); }
    });

    // suporte a arrastar/deslizar
    var x0 = null;
    track.addEventListener('pointerdown', function (e) { x0 = e.clientX; stop(); });
    track.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true);
      else auto();
      x0 = null;
    });

    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : auto(); });
    render();
    auto();
  })();

  /* ---------- FAQ acordeão ---------- */
  $$('.faq-item').forEach(function (item) {
    var btn = $('.faq-q', item);
    var panel = $('.faq-a', item);
    btn.addEventListener('click', function () {
      var open = item.hasAttribute('data-open');
      $$('.faq-item[data-open]').forEach(function (other) {
        if (other !== item) {
          other.removeAttribute('data-open');
          $('.faq-q', other).setAttribute('aria-expanded', 'false');
          $('.faq-a', other).style.height = '0px';
        }
      });
      if (open) {
        item.removeAttribute('data-open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.height = '0px';
      } else {
        item.setAttribute('data-open', '');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.height = panel.scrollHeight + 'px';
      }
    });
  });
  window.addEventListener('resize', function () {
    var open = $('.faq-item[data-open] .faq-a');
    if (open) open.style.height = open.scrollHeight + 'px';
  });

  /* ---------- Reserva: chips, preview e envio via WhatsApp ---------- */
  (function reserva() {
    var form = $('#reserva-form');
    if (!form) return;

    var WA_NUMBER = '5581979039543';
    var chipsWrap = $('#r-ocasiao-chips');
    var ocasiaoInput = $('#r-ocasiao');
    var status = $('#reserva-status');

    var fields = {
      nome: $('#r-nome'), tel: $('#r-tel'), data: $('#r-data'),
      hora: $('#r-hora'), pessoas: $('#r-pessoas'), obs: $('#r-obs'), consent: $('#r-consent')
    };
    var preview = {
      nome: $('#pv-nome'), tel: $('#pv-tel'), data: $('#pv-data'),
      hora: $('#pv-hora'), pessoas: $('#pv-pessoas'), ocasiao: $('#pv-ocasiao')
    };

    // data mínima = hoje
    var today = new Date().toISOString().split('T')[0];
    fields.data.min = today;

    // máscara leve de telefone
    fields.tel.addEventListener('input', function () {
      var d = fields.tel.value.replace(/\D/g, '').slice(0, 11);
      var out = d;
      if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
      fields.tel.value = out;
      updatePreview();
    });

    // chips de ocasião
    chipsWrap.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      $$('.chip', chipsWrap).forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      ocasiaoInput.value = chip.getAttribute('data-value');
      preview.ocasiao.textContent = chip.getAttribute('data-value');
    });

    function fmtDate(v) {
      if (!v) return '—';
      var p = v.split('-');
      return p[2] + '/' + p[1] + '/' + p[0];
    }
    function updatePreview() {
      preview.nome.textContent = fields.nome.value.trim() || '—';
      preview.tel.textContent = fields.tel.value.trim() || '—';
      preview.data.textContent = fmtDate(fields.data.value);
      preview.hora.textContent = fields.hora.value || '—';
      preview.pessoas.textContent = fields.pessoas.value || '—';
    }
    ['input', 'change'].forEach(function (ev) { form.addEventListener(ev, updatePreview); });

    function setError(el, msg) {
      var field = el.closest('.field');
      var err = $('.field-err[data-err-for="' + el.id + '"]', field) || $('.field-err', field);
      if (err && !err.id) err.id = 'err-' + el.id;
      if (msg) {
        field.setAttribute('data-invalid', '');
        el.setAttribute('aria-invalid', 'true');
        if (err) { err.textContent = msg; el.setAttribute('aria-describedby', err.id); }
      } else {
        field.removeAttribute('data-invalid');
        el.removeAttribute('aria-invalid');
        el.removeAttribute('aria-describedby');
        if (err) err.textContent = '';
      }
    }

    function validate() {
      var ok = true, firstBad = null;
      function check(el, cond, msg) {
        if (!cond) { setError(el, msg); ok = false; if (!firstBad) firstBad = el; }
        else setError(el, '');
      }
      check(fields.nome, fields.nome.value.trim().length >= 2, 'Digite o seu nome.');
      check(fields.tel, fields.tel.value.replace(/\D/g, '').length >= 10, 'Digite um WhatsApp válido com DDD.');
      check(fields.data, !!fields.data.value && fields.data.value >= today, 'Escolha uma data a partir de hoje.');
      check(fields.hora, !!fields.hora.value, 'Escolha um horário.');
      check(fields.pessoas, !!fields.pessoas.value, 'Informe quantas pessoas.');
      check(fields.consent, fields.consent.checked, 'Precisamos do seu consentimento para seguir.');
      if (firstBad) firstBad.focus();
      return ok;
    }

    $$('input, select', form).forEach(function (el) {
      el.addEventListener('blur', function () {
        if (el.hasAttribute('aria-invalid')) validate();
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      status.removeAttribute('data-tone');
      if (!validate()) {
        status.textContent = 'Confira os campos destacados acima.';
        status.setAttribute('data-tone', 'err');
        return;
      }
      var lines = [
        '*Reserva — Seu Antônio Janga*', '',
        '• Nome: ' + fields.nome.value.trim(),
        '• WhatsApp: ' + fields.tel.value.trim(),
        '• Data: ' + fmtDate(fields.data.value),
        '• Horário: ' + fields.hora.value,
        '• Pessoas: ' + fields.pessoas.value,
        '• Ocasião: ' + ocasiaoInput.value
      ];
      if (fields.obs.value.trim()) lines.push('• Observações: ' + fields.obs.value.trim());
      lines.push('', 'Enviado pelo site.');
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
      status.textContent = 'Tudo certo! Abrimos o WhatsApp com a sua comanda — é só enviar para a equipe confirmar.';
      status.setAttribute('data-tone', 'ok');
    });

    updatePreview();
  })();

})();
