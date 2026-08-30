/* ========================================
   MAIN JAVASCRIPT - Seu Antônio Janga
   Responsável por: Loader, Header, Navegação, 
   Formulários, Carrossel, Animações GSAP
   ======================================== */

// ========================================
// UTILITY FUNCTIONS
// ========================================

const DOM = {
  loader: document.getElementById('loader'),
  header: document.getElementById('header'),
  navToggle: document.getElementById('nav-toggle'),
  navDesktop: document.getElementById('main-nav'),
  navLinks: document.querySelectorAll('.nav-link'),
  form: document.getElementById('form-reserva'),
  depoimentoCards: document.querySelectorAll('.depoimento-card'),
  indicators: document.querySelectorAll('.indicator'),
};

const EVENTS = {
  hideLoader() {
    if (DOM.loader) {
      setTimeout(() => {
        DOM.loader.style.display = 'none';
      }, 2000);
    }
  },

  setupMobileNav() {
    if (!DOM.navToggle) return;

    DOM.navToggle.addEventListener('click', () => {
      DOM.navToggle.classList.toggle('is-open');
      DOM.navDesktop.classList.toggle('is-open');
    });

    // Fechar menu ao clicar em um link
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        DOM.navToggle.classList.remove('is-open');
        DOM.navDesktop.classList.remove('is-open');
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-desktop') && !e.target.closest('.nav-toggle')) {
        DOM.navToggle.classList.remove('is-open');
        DOM.navDesktop.classList.remove('is-open');
      }
    });
  },

  setupActiveNavLink() {
    const observerOptions = {
      threshold: 0.25,
      rootMargin: '-80px 0px -66% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          DOM.navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            }
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  },

  setupSmoothScroll() {
    document.querySelectorAll('a[data-scroll]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

class FormHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.fields = {
      nome: this.form.querySelector('#reserva-nome'),
      email: this.form.querySelector('#reserva-email'),
      tel: this.form.querySelector('#reserva-tel'),
      data: this.form.querySelector('#reserva-data'),
      hora: this.form.querySelector('#reserva-hora'),
      pessoas: this.form.querySelector('#reserva-pessoas'),
      lgpd: this.form.querySelector('input[name="lgpd"]'),
    };

    this.setupListeners();
  }

  setupListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    this.fields.nome.addEventListener('blur', () => this.validateField('nome'));
    this.fields.email.addEventListener('blur', () => this.validateField('email'));
    this.fields.tel.addEventListener('blur', () => this.validateField('tel'));
    this.fields.data.addEventListener('blur', () => this.validateField('data'));
    this.fields.hora.addEventListener('change', () => this.validateField('hora'));
    this.fields.pessoas.addEventListener('change', () => this.validateField('pessoas'));
    this.fields.lgpd.addEventListener('change', () => this.validateField('lgpd'));
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const group = field.closest('.form-group');
    const errorMsg = group.querySelector('.error-msg');
    let isValid = false;
    let message = '';

    switch (fieldName) {
      case 'nome':
        isValid = field.value.trim().length >= 3;
        message = 'Nome deve ter pelo menos 3 caracteres';
        break;

      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        message = 'Email inválido';
        break;

      case 'tel':
        isValid = /^\(?\d{2}\)?\s?9\s?\d{4}-?\d{4}$/.test(field.value.replace(/\s/g, ''));
        message = 'WhatsApp inválido (use formato: (81) 9 9999-9999)';
        break;

      case 'data':
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        isValid = selectedDate >= today;
        message = 'Data deve ser hoje ou no futuro';
        break;

      case 'hora':
        isValid = field.value !== '';
        message = 'Selecione um horário';
        break;

      case 'pessoas':
        isValid = field.value !== '';
        message = 'Selecione a quantidade de pessoas';
        break;

      case 'lgpd':
        isValid = field.checked;
        message = 'Você deve autorizar o contato';
        break;
    }

    if (isValid) {
      group.classList.remove('error');
      if (errorMsg) errorMsg.textContent = '';
    } else {
      group.classList.add('error');
      if (errorMsg) errorMsg.textContent = message;
    }

    return isValid;
  }

  validateAll() {
    const fields = Object.keys(this.fields);
    return fields.every(field => this.validateField(field));
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateAll()) {
      console.warn('Formulário contém erros');
      return;
    }

    // Montar mensagem WhatsApp
    const nome = this.fields.nome.value;
    const email = this.fields.email.value;
    const tel = this.fields.tel.value;
    const data = new Date(this.fields.data.value).toLocaleDateString('pt-BR');
    const hora = this.fields.hora.value;
    const pessoas = this.fields.pessoas.value;
    const obs = this.form.querySelector('#reserva-observacoes').value;

    const mensagem = `Olá! Gostaria de fazer uma reserva no Seu Antônio Janga\n\n` +
      `📍 *Nome:* ${nome}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *WhatsApp:* ${tel}\n` +
      `📅 *Data:* ${data}\n` +
      `🕒 *Horário:* ${hora}\n` +
      `👥 *Pessoas:* ${pessoas}\n` +
      (obs ? `📝 *Observações:* ${obs}\n` : '') +
      `\nAgradeço a atenção!`;

    const whatsappURL = `https://wa.me/5581979039543?text=${encodeURIComponent(mensagem)}`;

    // Feedback visual
    const button = this.form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = '✓ Redirecionando...';
    button.disabled = true;

    // Abrir WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      // Reset form
      this.form.reset();
      button.textContent = originalText;
      button.disabled = false;
      // Remover erros visuais
      this.form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    }, 500);
  }
}

// ========================================
// CARROSSEL DE DEPOIMENTOS
// ========================================

class Carousel {
  constructor(carouselSelector, indicatorsSelector) {
    this.carousel = document.querySelector(carouselSelector);
    this.indicators = document.querySelectorAll(indicatorsSelector);
    this.cards = document.querySelectorAll('.depoimento-card');
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    if (this.cards.length === 0) return;

    this.init();
  }

  init() {
    this.showSlide(0);
    this.setupIndicators();
    this.startAutoPlay();

    // Pause auto-play on interaction
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.showSlide(index);
        this.stopAutoPlay();
      });
    });
  }

  showSlide(index) {
    this.cards.forEach((card, i) => {
      card.classList.remove('is-active');
      if (this.indicators[i]) this.indicators[i].classList.remove('is-active');
    });

    this.currentIndex = index % this.cards.length;
    this.cards[this.currentIndex].classList.add('is-active');
    if (this.indicators[this.currentIndex]) {
      this.indicators[this.currentIndex].classList.add('is-active');
    }
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  previousSlide() {
    this.showSlide(this.currentIndex - 1 + this.cards.length);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 8000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// ========================================
// GSAP ANIMATIONS (Se disponível)
// ========================================

function setupGSAPAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP não carregou. Animações desabilitadas.');
    return;
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Hero animations - entrada suave
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCTA = document.querySelector('.hero-cta-group');
  const heroBadges = document.querySelector('.hero-badges');

  if (heroTitle) {
    gsap.from(heroTitle, {
      duration: 1.2,
      opacity: 0,
      y: 40,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      duration: 1.2,
      opacity: 0,
      y: 30,
      delay: 0.5,
      ease: 'power3.out'
    });
  }

  if (heroCTA) {
    gsap.from(heroCTA, {
      duration: 1.2,
      opacity: 0,
      y: 20,
      delay: 0.7,
      ease: 'power3.out'
    });
  }

  if (heroBadges) {
    gsap.from(heroBadges, {
      duration: 1,
      opacity: 0,
      delay: 0.9,
      ease: 'power3.out'
    });
  }

  // Scroll animations com ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Section headers - reveal suave
    document.querySelectorAll('.section-header').forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
      });
    });

    // Cards reveal - stagger
    document.querySelectorAll('[data-reveal="card"]').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card.closest('section'),
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        duration: 0.7,
        opacity: 0,
        y: 30,
        scale: 0.95,
        ease: 'power3.out',
        delay: index * 0.12
      });
    });

    // Gallery items - parallax light
    document.querySelectorAll('[data-reveal="gallery"]').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        y: 40,
        scale: 0.9,
        ease: 'power3.out',
        delay: index * 0.1
      });

      // Hover parallax
      item.addEventListener('mouseenter', () => {
        gsap.to(item.querySelector('img'), {
          duration: 0.5,
          scale: 1.08,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item.querySelector('img'), {
          duration: 0.5,
          scale: 1,
          ease: 'power2.out'
        });
      });
    });

    // Prato cards - elevation on view
    document.querySelectorAll('.prato-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.7,
        opacity: 0,
        y: 40,
        scale: 0.95,
        ease: 'power3.out',
        delay: index * 0.1
      });
    });

    // Diferencial cards - rotate subtle
    document.querySelectorAll('.diferencial-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        rotateY: 5,
        ease: 'power3.out',
        delay: index * 0.12
      });
    });

    // Depoimentos - fade in
    document.querySelectorAll('.depoimento-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        ease: 'power3.out'
      });
    });

    // Info cards
    document.querySelectorAll('.info-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.7,
        opacity: 0,
        y: 20,
        ease: 'power3.out',
        delay: index * 0.08
      });
    });
  }

  // Button hover animations - pulse + scale
  document.querySelectorAll('.btn-primary').forEach(btn => {
    let hoverTween;

    btn.addEventListener('mouseenter', () => {
      if (hoverTween) hoverTween.kill();
      hoverTween = gsap.to(btn, {
        duration: 0.4,
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(196, 69, 54, 0.4)',
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      if (hoverTween) hoverTween.kill();
      hoverTween = gsap.to(btn, {
        duration: 0.4,
        scale: 1,
        boxShadow: 'none',
        ease: 'power2.out'
      });
    });
  });

  // Parallax Hero Image (subtle)
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && window.innerWidth > 768) {
    gsap.to(heroImg, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        markers: false
      },
      y: 80,
      ease: 'none'
    });
  }

  // Floating animation para seal
  const seal = document.querySelector('.seal');
  if (seal) {
    gsap.to(seal, {
      duration: 3,
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  console.log('✅ GSAP Animations ativadas com sucesso');
}

// ========================================
// HEADER SHADOW ON SCROLL
// ========================================

function setupHeaderScroll() {
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      DOM.header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      DOM.header.style.boxShadow = 'none';
    }

    lastScrollY = scrollY;
  });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🍴 Seu Antônio Janga — Carregando...');

  // Loader
  EVENTS.hideLoader();

  // Navigation
  EVENTS.setupMobileNav();
  EVENTS.setupActiveNavLink();
  EVENTS.setupSmoothScroll();

  // Form
  new FormHandler('form-reserva');

  // Carousel
  new Carousel('[data-carousel="depoimentos"]', '.indicator');

  // Header shadow on scroll
  setupHeaderScroll();

  // GSAP animations (com fallback)
  setupGSAPAnimations();

  console.log('✅ Seu Antônio Janga — Pronto para usar!');
});

// Fallback para prevenir erros se elementos não existirem
window.addEventListener('error', (e) => {
  console.warn('Erro não crítico:', e.message);
});
