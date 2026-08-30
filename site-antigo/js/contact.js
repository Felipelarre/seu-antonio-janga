/* ==========================================================================
   SEU ANTÔNIO JANGA — contact.js
   Live Reservation Ticket Preview + Form Validation + WhatsApp Messenger Engine
   ========================================================================== */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5581979039543';

  /* ---------------------------------------------------------------- */
  /* FORM VALIDATION UTILITIES                                         */
  /* ---------------------------------------------------------------- */
  function showError(field, message) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.add('has-error');
    const err = wrap.querySelector('.field-error');
    if (err) err.textContent = message;
  }

  function clearError(field) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.remove('has-error');
  }

  function validateField(field) {
    clearError(field);
    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
      showError(field, 'Por favor, preencha este campo.');
      return false;
    }

    if (field.type === 'tel' && value) {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        showError(field, 'Informe um telefone válido com DDD, ex: (81) 98888-8888.');
        return false;
      }
    }

    if (field.type === 'email' && value) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!ok) {
        showError(field, 'Informe um e-mail válido.');
        return false;
      }
    }

    if (field.type === 'date' && value) {
      const picked = new Date(value + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (picked < today) {
        showError(field, 'Escolha uma data a partir de hoje.');
        return false;
      }
    }

    return true;
  }

  /* ---------------------------------------------------------------- */
  /* PHONE MASK                                                        */
  /* ---------------------------------------------------------------- */
  function phoneMask(e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (v.length > 0) {
      v = v.replace(/(\d{0,2})/, '($1');
    }
    e.target.value = v.trim().replace(/-$/, '').replace(/\($/, '');
  }

  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', phoneMask);
  });

  /* ---------------------------------------------------------------- */
  /* LIVE RESERVATION TICKET PREVIEW                                   */
  /* ---------------------------------------------------------------- */
  const rForm = document.getElementById('reserva-form');
  const prevNome = document.getElementById('preview-nome');
  const prevTel = document.getElementById('preview-telefone');
  const prevData = document.getElementById('preview-data');
  const prevHora = document.getElementById('preview-horario');
  const prevPessoas = document.getElementById('preview-pessoas');
  const prevOcasiao = document.getElementById('preview-ocasiao');

  function formatDateBR(iso) {
    if (!iso) return 'Hoje';
    const parts = iso.split('-');
    return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : iso;
  }

  if (rForm) {
    const rNome = document.getElementById('r-nome');
    const rTel = document.getElementById('r-telefone');
    const rData = document.getElementById('r-data');
    const rHora = document.getElementById('r-horario');
    const rPessoas = document.getElementById('r-pessoas');
    const rOcasiao = document.getElementById('r-ocasiao');
    const chips = document.querySelectorAll('#ocasiao-chips .chip-btn');

    if (rNome && prevNome) {
      rNome.addEventListener('input', function () {
        prevNome.textContent = rNome.value.trim() || 'Seu Nome';
      });
    }

    if (rTel && prevTel) {
      rTel.addEventListener('input', function () {
        prevTel.textContent = rTel.value.trim() || '(81) 9...';
      });
    }

    if (rData && prevData) {
      rData.addEventListener('change', function () {
        prevData.textContent = formatDateBR(rData.value);
      });
      if (rData.value) prevData.textContent = formatDateBR(rData.value);
    }

    if (rHora && prevHora) {
      rHora.addEventListener('change', function () {
        prevHora.textContent = rHora.value || 'A definir';
      });
    }

    if (rPessoas && prevPessoas) {
      rPessoas.addEventListener('change', function () {
        prevPessoas.textContent = rPessoas.value ? rPessoas.value.split('(')[0].trim() : 'A definir';
      });
    }

    // Occasion Chip Selection
    chips.forEach(function (btn) {
      btn.addEventListener('click', function () {
        chips.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        const val = btn.getAttribute('data-value');
        if (rOcasiao) rOcasiao.value = val;
        if (prevOcasiao) prevOcasiao.textContent = val;
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* FORM SUBMISSIONS (WhatsApp Hand-off)                              */
  /* ---------------------------------------------------------------- */
  document.querySelectorAll('[data-whatsapp-form]').forEach(function (form) {
    const statusEl = form.querySelector('.form-status');
    const template = form.getAttribute('data-whatsapp-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
      const allValid = fields.reduce(function (acc, f) {
        return validateField(f) && acc;
      }, true);

      if (!allValid) {
        if (statusEl) {
          statusEl.textContent = 'Por favor, revise os campos destacados em vermelho antes de enviar.';
          statusEl.className = 'form-status is-error';
        }
        const firstError = form.querySelector('.has-error input, .has-error textarea, .has-error select');
        if (firstError) firstError.focus();
        return;
      }

      const data = {};
      fields.forEach(function (f) {
        if (f.name) data[f.name] = f.value.trim();
      });

      let message = '';
      if (template === 'reserva') {
        message =
          'Olá! Quero fazer uma reserva no *Seu Antônio Janga* 🍺🎉\n\n' +
          '📋 *DADOS DA RESERVA*\n' +
          '• *Nome:* ' + data.nome + '\n' +
          '• *WhatsApp:* ' + data.telefone + '\n' +
          '• *Data:* ' + formatDateBR(data.data) + '\n' +
          '• *Horário:* ' + data.horario + '\n' +
          '• *Número de Pessoas:* ' + data.pessoas + '\n' +
          (data.ocasiao ? '• *Tipo de Ocasião:* ' + data.ocasiao + '\n' : '') +
          (data.observacoes ? '\n📝 *Observações:* ' + data.observacoes + '\n' : '') +
          '\n_Aguardo confirmação da equipe!_';
      } else {
        message =
          'Olá! Vim pelo site do *Seu Antônio Janga* 💬\n\n' +
          '📋 *MENSAGEM DE CONTATO*\n' +
          '• *Nome:* ' + data.nome + '\n' +
          (data.telefone ? '• *Telefone:* ' + data.telefone + '\n' : '') +
          (data.email ? '• *E-mail:* ' + data.email + '\n' : '') +
          '• *Assunto:* ' + (data.assunto || 'Contato Geral') + '\n\n' +
          '💬 *Mensagem:*\n' + data.mensagem;
      }

      const finalUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

      if (statusEl) {
        statusEl.textContent = 'Tudo certo! Redirecionando para o WhatsApp para confirmar com nossa equipe…';
        statusEl.className = 'form-status is-success';
      }

      window.open(finalUrl, '_blank', 'noopener');
    });

    // Revalidate on blur
    form.querySelectorAll('input, select, textarea').forEach(function (f) {
      f.addEventListener('blur', function () {
        if (f.value.trim()) validateField(f);
      });
    });
  });

})();
