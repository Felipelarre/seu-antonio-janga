/* ==========================================================================
   SEU ANTÔNIO JANGA — main.js
   Loader, Header Scroll State, Mobile Navigation Drawer, GSAP Scroll Reveals,
   Counters, Testimonials Carousel with Touch Support, FAQ Accordion, Lightbox.
   Defensively architected: works 100% even if external CDN fails.
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';

  if (hasGSAP && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------------------------------------------------------- */
  /* LOADER                                                            */
  /* ---------------------------------------------------------------- */
  function hideLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    loader.classList.add('is-hidden');
    setTimeout(function () {
      if (loader.parentNode) loader.remove();
    }, 600);
  }
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 250);
  });

  /* ---------------------------------------------------------------- */
  /* HEADER SCROLL STATE                                               */
  /* ---------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------------- */
  /* MOBILE NAV TOGGLE & DRAWER                                        */
  /* ---------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    const isMobile = window.matchMedia('(max-width: 960px)');
    const updateNavVisibility = function () {
      mainNav.setAttribute('aria-hidden', String(isMobile.matches && !mainNav.classList.contains('is-open')));
    };
    updateNavVisibility();

    function toggleMenu(open) {
      const willOpen = typeof open === 'boolean' ? open : !navToggle.classList.contains('is-open');
      navToggle.classList.toggle('is-open', willOpen);
      mainNav.classList.toggle('is-open', willOpen);
      document.body.style.overflow = willOpen ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', String(willOpen));
      updateNavVisibility();
    }

    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggleMenu(false);
      });
    });

    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    isMobile.addEventListener('change', function () {
      toggleMenu(false);
      updateNavVisibility();
    });
  }

  /* ---------------------------------------------------------------- */
  /* ACTIVE NAV LINK                                                   */
  /* ---------------------------------------------------------------- */
  const currentFile = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a[href]').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  /* ---------------------------------------------------------------- */
  /* HERO ENTRANCE ANIMATIONS                                          */
  /* ---------------------------------------------------------------- */
  function initHeroEntrance() {
    const hero = document.querySelector('[data-hero-timeline]');
    if (!hero) return;

    if (!hasGSAP || reduceMotion) {
      hero.querySelectorAll('[data-hero-item]').forEach(function (el) {
        el.style.opacity = '1';
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.2 });
    tl.from('[data-hero-item="eyebrow"]', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('[data-hero-item="title-line"]', { y: 40, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' }, '-=0.4')
      .from('[data-hero-item="sub"]', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('[data-hero-item="actions"] > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
      .from('[data-hero-item="proof"]', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-showcase', { opacity: 0, scale: 0.94, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .from('.hero-scroll', { opacity: 0, duration: 0.8 }, '-=0.3');
  }
  initHeroEntrance();

  /* ---------------------------------------------------------------- */
  /* SCROLL REVEALS                                                    */
  /* ---------------------------------------------------------------- */
  function initScrollReveals() {
    const revealGroups = document.querySelectorAll('[data-reveal]');
    if (!revealGroups.length) return;

    if (!hasGSAP || reduceMotion) {
      revealGroups.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    revealGroups.forEach(function (el) {
      const mode = el.getAttribute('data-reveal');
      if (mode === 'stagger') {
        const items = Array.prototype.slice.call(el.children);
        gsap.from(items, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        });
      } else {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: mode === 'fade' ? 0 : 36,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    });
  }
  initScrollReveals();

  /* ---------------------------------------------------------------- */
  /* ANIMATED NUMERICAL COUNTERS                                       */
  /* ---------------------------------------------------------------- */
  function initCounters() {
    const counterEls = document.querySelectorAll('[data-count]');
    if (!counterEls.length) return;

    counterEls.forEach(function (el) {
      const rawVal = el.getAttribute('data-count');
      const target = parseFloat(rawVal);
      const hasDecimal = rawVal.includes('.');
      const decimals = hasDecimal ? 1 : 0;

      const triggerRun = function () {
        if (reduceMotion || !hasGSAP) {
          el.textContent = target.toFixed(decimals).replace('.', ',');
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = obj.val.toFixed(decimals).replace('.', ',');
          }
        });
      };

      if (hasGSAP && window.ScrollTrigger) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: triggerRun
        });
      } else {
        triggerRun();
      }
    });
  }
  initCounters();

  /* ---------------------------------------------------------------- */
  /* TESTIMONIALS CAROUSEL                                             */
  /* ---------------------------------------------------------------- */
  const track = document.querySelector('.testi-track');
  const prevBtn = document.querySelector('[data-testi-prev]');
  const nextBtn = document.querySelector('[data-testi-next]');

  if (track && (prevBtn || nextBtn)) {
    const getScrollStep = function () {
      const card = track.querySelector('.testi-card');
      return card ? card.getBoundingClientRect().width + 24 : 320;
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    // Touch Swipe handling
    let startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      const diffX = startX - e.changedTouches[0].clientX;
      if (Math.abs(diffX) > 50) {
        track.scrollBy({ left: diffX > 0 ? getScrollStep() : -getScrollStep(), behavior: 'smooth' });
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------- */
  /* FAQ ACCORDION                                                     */
  /* ---------------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;

    const answerId = a.id || 'faq-answer-' + Array.prototype.indexOf.call(item.parentNode.children, item);
    a.id = answerId;
    q.setAttribute('aria-controls', answerId);
    q.setAttribute('aria-expanded', 'false');

    q.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      // Close all other items for clean accordion UX
      document.querySelectorAll('.faq-item.is-open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherA = other.querySelector('.faq-a');
          if (otherA) otherA.style.maxHeight = null;
          const otherQ = other.querySelector('.faq-q');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      q.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------------------------------------------------------------- */
  /* GALLERY LIGHTBOX                                                  */
  /* ---------------------------------------------------------------- */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    let lastFocusedElement = null;

    function openLightbox(src, alt) {
      lastFocusedElement = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || 'Foto do Seu Antônio Janga';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () {
        lbImg.src = '';
      }, 300);
      if (lastFocusedElement) lastFocusedElement.focus();
    }

    document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const src = trigger.getAttribute('data-lightbox') || (trigger.querySelector('img') ? trigger.querySelector('img').src : '');
        const alt = trigger.querySelector('img') ? trigger.querySelector('img').alt : '';
        if (src) openLightbox(src, alt);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* BUSINESS HOURS STATUS & UTILITIES                                 */
  /* ---------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  function checkOpenNow() {
    const now = new Date();
    const day = now.getDay(); // 0 Sun, 1 Mon .. 6 Sat
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (day >= 1 && day <= 5) return currentMinutes >= 16 * 60 && currentMinutes < 24 * 60;
    if (day === 6) return currentMinutes >= 12 * 60 && currentMinutes < 24 * 60;
    if (day === 0) return currentMinutes >= 12 * 60 && currentMinutes < 23 * 60;
    return false;
  }

  document.querySelectorAll('[data-open-status]').forEach(function (el) {
    const isOpen = checkOpenNow();
    const dot = el.querySelector('.dot');
    if (dot) {
      dot.style.background = isOpen ? 'var(--green-400)' : 'var(--amber-400)';
      dot.style.boxShadow = isOpen ? '0 0 10px var(--green-400)' : '0 0 8px var(--amber-400)';
    }
    const label = el.querySelector('.label');
    if (label) {
      label.textContent = isOpen ? 'Aberto agora · Venha nos visitar!' : 'Abre hoje às 16h · Música ao vivo';
    }
  });

  // Highlight today's operating hours row
  const todayIdx = new Date().getDay();
  document.querySelectorAll('[data-day]').forEach(function (row) {
    if (parseInt(row.getAttribute('data-day'), 10) === todayIdx) {
      row.classList.add('is-today');
    }
  });

  // Set min date to today for date picker
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    input.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    if (!input.value) {
      input.value = yyyy + '-' + mm + '-' + dd;
    }
  });

})();
