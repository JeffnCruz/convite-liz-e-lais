/**
 * =========================================================================
 * CONVITE INTERATIVO - LIZ E LAÍS · 5 ANOS
 * Lógica de abertura das cortinas, ações (Localização, WhatsApp, Presentes)
 * e tela modal de sugestão de presentes.
 * =========================================================================
 */

(function () {
  'use strict';

  // Marca documento com JavaScript ativo
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js-enabled');

  // Recupera configurações com valores seguros padrão
  const config = window.CONVITE_CONFIG || {
    WHATSAPP_NUMBER: "",
    WHATSAPP_MESSAGE: "Oi! Confirmo minha presença no aniversário da Liz e da Laís! 🎀",
    MAPS_URL: "",
    aniversariantes: "Liz e Laís",
    idade: "5 anos",
    dataHora: "06/12, às 13h",
    localNome: "Parque das Árvores — Salão de Festas",
    endereco: "Rua Mamoneira, 148"
  };

  document.addEventListener('DOMContentLoaded', initConvite);

  function initConvite() {
    const audioControl = setupAudio();
    setupCurtains(audioControl);
    setupActions();
    setupGiftModal();
  }

  /**
   * Configura o áudio delicado do convite e o botão de pausar/retomar
   */
  function setupAudio() {
    const audio = document.getElementById('audio-convite');
    const btnAudio = document.getElementById('btn-toggle-audio');

    if (!audio) {
      return {
        play: function () {},
        stop: function () {},
        toggle: function () {}
      };
    }

    // Define volume suave
    audio.volume = 0.50;

    function play() {
      // Aciona no próprio clique do usuário para total compatibilidade no celular
      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(function () {
          updateUI(true);
        }).catch(function (err) {
          console.warn("Reprodução de áudio prevenida pelo navegador:", err);
          updateUI(false);
        });
      }
    }

    function stop() {
      // Para a música e volta ao início da faixa
      audio.pause();
      audio.currentTime = 0;
      updateUI(false);
      if (btnAudio) {
        btnAudio.classList.add('is-hidden');
      }
    }

    function toggle() {
      if (audio.paused) {
        audio.play().then(function () {
          updateUI(true);
        }).catch(function (err) {
          console.warn("Erro ao retomar áudio:", err);
        });
      } else {
        audio.pause();
        updateUI(false);
      }
    }

    function updateUI(isPlaying) {
      if (!btnAudio) return;
      btnAudio.classList.remove('is-hidden');
      if (isPlaying) {
        btnAudio.classList.remove('is-paused');
        btnAudio.classList.add('is-playing');
        btnAudio.setAttribute('aria-pressed', 'true');
        btnAudio.setAttribute('aria-label', 'Pausar música');
        btnAudio.setAttribute('title', 'Pausar música');
      } else {
        btnAudio.classList.remove('is-playing');
        btnAudio.classList.add('is-paused');
        btnAudio.setAttribute('aria-pressed', 'false');
        btnAudio.setAttribute('aria-label', 'Retomar música');
        btnAudio.setAttribute('title', 'Retomar música');
      }
    }

    if (btnAudio) {
      btnAudio.addEventListener('click', function (e) {
        e.preventDefault();
        toggle();
      });
    }

    return { play, stop, toggle };
  }

  /**
   * Configura os links e botões de ação:
   * 1. Localização: bloco do endereço clicável para o Google Maps
   * 2. Confirmar presença: WhatsApp com número e mensagem pré-preenchida (visível e desabilitado se vazio)
   */
  function setupActions() {
    // -----------------------------------------------------------------------
    // 1. Localização (Bloco de endereço clicável para o Google Maps)
    // -----------------------------------------------------------------------
    const linkLocalizacao = document.getElementById('link-localizacao');
    if (linkLocalizacao) {
      const rawMapsUrl = (config.MAPS_URL || config.mapsUrl || "").trim();
      const fallbackQuery = config.enderecoBusca || "Rua Mamoneira, 148, Parque das Árvores";
      const finalMapsUrl = rawMapsUrl !== ""
        ? rawMapsUrl
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackQuery)}`;

      linkLocalizacao.setAttribute('href', finalMapsUrl);
    }

    // -----------------------------------------------------------------------
    // 2. Confirmar presença (WhatsApp)
    // REGRA: Se faltar o número, mantenha o botão visível e desabilitado na prévia.
    // -----------------------------------------------------------------------
    const btnConfirmar = document.getElementById('btn-confirmar-presenca');
    if (btnConfirmar) {
      btnConfirmar.classList.remove('is-hidden');
      const rawNumber = String(config.WHATSAPP_NUMBER || config.whatsappNumero || "").trim();
      const cleanNumber = rawNumber.replace(/\D/g, "");

      if (!cleanNumber) {
        // Número vazio: visível, porém desabilitado
        btnConfirmar.classList.add('is-disabled');
        btnConfirmar.setAttribute('aria-disabled', 'true');
        btnConfirmar.removeAttribute('href');
        btnConfirmar.setAttribute('title', 'Preencha o número do WhatsApp em js/config.js para ativar o envio');
      } else {
        // Número configurado: botão ativo
        const msg = config.WHATSAPP_MESSAGE || config.whatsappMensagem || "Oi! Confirmo minha presença no aniversário da Liz e da Laís! 🎀";
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;

        btnConfirmar.classList.remove('is-disabled');
        btnConfirmar.removeAttribute('aria-disabled');
        btnConfirmar.removeAttribute('title');
        btnConfirmar.setAttribute('href', whatsappUrl);
      }

      btnConfirmar.addEventListener('click', function (e) {
        if (btnConfirmar.classList.contains('is-disabled')) {
          e.preventDefault();
        }
      });
    }
  }

  /**
   * Configura o palco de teatro e a abertura das cortinas
   */
  function setupCurtains(audioControl) {
    const stage = document.getElementById('stage-container');
    const btnOpen = document.getElementById('btn-open-curtain');
    const btnReplay = document.getElementById('btn-replay-curtain');
    const curtainsLayer = document.getElementById('curtains-stage');

    if (!stage || !btnOpen) return;

    let isOpened = false;

    function openCurtains() {
      if (isOpened) return;
      isOpened = true;

      // Inicia a música junto com o primeiro movimento da cortina (acionado no clique)
      if (audioControl) {
        audioControl.play();
      }

      // Animação de abertura (cortinas deslizam cerca de 1 segundo)
      stage.classList.add('is-opened');
      btnOpen.setAttribute('aria-expanded', 'true');

      // Gera partículas suaves estritamente nas bordas
      spawnEdgeSparkles();

      // Após 1s (duração da animação), desativa interações na cortina para rolagem livre
      setTimeout(() => {
        if (curtainsLayer) {
          curtainsLayer.setAttribute('aria-hidden', 'true');
        }
      }, 1000);
    }

    function closeCurtains() {
      if (!isOpened) return;
      isOpened = false;

      // Para a música e volta ao início da faixa
      if (audioControl) {
        audioControl.stop();
      }

      stage.classList.remove('is-opened');
      btnOpen.setAttribute('aria-expanded', 'false');
      if (curtainsLayer) {
        curtainsLayer.removeAttribute('aria-hidden');
      }
      btnOpen.focus();
    }

    // Eventos de clique e toque
    btnOpen.addEventListener('click', function (e) {
      e.preventDefault();
      openCurtains();
    });

    // Suporte a teclado (Enter e Espaço)
    btnOpen.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCurtains();
      }
    });

    // Botão de rever abertura da cortina
    if (btnReplay) {
      btnReplay.addEventListener('click', function (e) {
        e.preventDefault();
        closeCurtains();
      });
    }
  }

  /**
   * Configura a tela/modal de Sugestão de Presente
   */
  function setupGiftModal() {
    const btnOpenGift = document.getElementById('btn-sugestao-presente');
    const modal = document.getElementById('modal-presentes');
    const backdrop = document.getElementById('gift-modal-backdrop');
    const btnCloseGift = document.getElementById('btn-voltar-convite');

    if (!btnOpenGift || !modal) return;

    function openModal() {
      modal.removeAttribute('hidden');
      // Força reflow para permitir transição CSS
      void modal.offsetWidth;
      modal.classList.add('is-active');
      btnOpenGift.setAttribute('aria-expanded', 'true');
      document.body.classList.add('modal-open');

      // Foco acessível no botão "Voltar ao convite"
      if (btnCloseGift) {
        btnCloseGift.focus();
      }
    }

    function closeModal() {
      modal.classList.remove('is-active');
      btnOpenGift.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('modal-open');

      setTimeout(() => {
        if (!modal.classList.contains('is-active')) {
          modal.setAttribute('hidden', '');
        }
      }, 250);

      // Retorna foco para o botão que abriu o modal
      btnOpenGift.focus();
    }

    btnOpenGift.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });

    if (btnCloseGift) {
      btnCloseGift.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeModal();
      });
    }

    // Tecla Escape para fechar modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  /**
   * Brilhos e corações sutis nas margens/laterais durante a revelação.
   */
  function spawnEdgeSparkles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = document.getElementById('edge-particles-layer');
    if (!container) return;

    const particles = ['✨', '💖', '🎀', '✨', '💛', '✨'];
    const positions = [
      { side: 'left', x: '8px', y: '20%' },
      { side: 'right', x: '8px', y: '25%' },
      { side: 'left', x: '12px', y: '50%' },
      { side: 'right', x: '12px', y: '55%' },
      { side: 'left', x: '10px', y: '80%' },
      { side: 'right', x: '10px', y: '85%' }
    ];

    positions.forEach((pos, index) => {
      const span = document.createElement('span');
      span.className = 'edge-particle-dynamic';
      span.textContent = particles[index % particles.length];
      span.setAttribute('aria-hidden', 'true');

      span.style.position = 'absolute';
      span.style.top = pos.y;
      if (pos.side === 'left') {
        span.style.left = pos.x;
      } else {
        span.style.right = pos.x;
      }
      span.style.fontSize = '1.15rem';
      span.style.pointerEvents = 'none';
      span.style.zIndex = '14';
      span.style.opacity = '0';
      span.style.transition = 'all 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)';
      span.style.transform = 'scale(0.5) translateY(0)';
      span.style.filter = 'drop-shadow(0 2px 4px rgba(212, 175, 55, 0.4))';

      container.appendChild(span);

      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = `scale(1.1) translateY(-18px) ${pos.side === 'left' ? 'translateX(-6px)' : 'translateX(6px)'}`;
      }, 50 + index * 100);

      setTimeout(() => {
        span.style.opacity = '0';
        span.style.transform = `scale(0.8) translateY(-30px) ${pos.side === 'left' ? 'translateX(-12px)' : 'translateX(12px)'}`;
      }, 750 + index * 100);

      setTimeout(() => {
        if (span.parentNode) {
          span.parentNode.removeChild(span);
        }
      }, 1500);
    });
  }

})();
