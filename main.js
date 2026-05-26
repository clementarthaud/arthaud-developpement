'use strict';
/* ===========================================================
   ARTHAUD DÉVELOPPEMENT — main.js (V3 multi-pages)
   Navigation · Hero vidéo rotation · Reveal · Filtres · Form
   =========================================================== */


/* ---------- 1. HEADER scroll ---------- */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ---------- 2. MENU MOBILE ---------- */
(function () {
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) close();
  });
})();


/* ---------- 3. HERO VIDEO ROTATION ---------- */
(function () {
  const hero = document.querySelector('.hero__media');
  if (!hero) return;

  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const videos = Array.from(hero.querySelectorAll('video'));
  const fallback = hero.querySelector('img');

  // Sur reduced-motion uniquement : on garde l'image statique
  if (reduced || videos.length === 0) {
    if (fallback) fallback.classList.add('is-active');
    videos.forEach(v => { v.removeAttribute('autoplay'); v.pause(); v.remove(); });
    return;
  }

  // Crossfade entre vidéos : la suivante démarre AVANT la fin de la précédente
  const OVERLAP_S = 1.2;   // chevauchement complet en secondes
  let idx = 0;
  let switching = false;

  // Amorce le décodeur d'une vidéo (play → pause immédiat) pour qu'elle puisse
  // démarrer instantanément lors du prochain crossfade.
  const warmUp = (v) => {
    if (v.dataset.warmed === '1') return;
    v.dataset.warmed = '1';
    try {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.then(() => { v.pause(); v.currentTime = 0; }).catch(() => {});
      } else {
        v.pause();
      }
    } catch (_) {}
  };

  const reveal = (i) => {
    requestAnimationFrame(() => {
      videos.forEach((vid, k) => vid.classList.toggle('is-active', k === i));
      if (fallback) fallback.classList.remove('is-active');
    });
    // Préchauffage du décodeur de la prochaine vidéo pendant la lecture courante
    const nextIdx = (i + 1) % videos.length;
    if (nextIdx !== i) warmUp(videos[nextIdx]);
  };

  const showVideo = (i) => {
    const v = videos[i];
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.then === 'function') {
      p.then(() => reveal(i)).catch(() => {
        // Autoplay refusé (iOS / Low Power Mode) — on garde l'image et on retente
        // au premier tap utilisateur.
        if (fallback) fallback.classList.add('is-active');
        const retry = () => {
          v.play().then(() => reveal(i)).catch(() => {});
          document.removeEventListener('touchstart', retry);
          document.removeEventListener('click', retry);
        };
        document.addEventListener('touchstart', retry, { once: true, passive: true });
        document.addEventListener('click', retry, { once: true });
      });
    } else {
      reveal(i);
    }
  };

  // Préchargement agressif : on charge toutes les vidéos en mémoire dès le départ
  videos.forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.preload = 'auto';
    v.load();
  });

  // Amorce tous les décodeurs au plus tôt — la 1ʳᵉ démarrera juste après via showVideo(0)
  videos.forEach((v, i) => { if (i !== 0) warmUp(v); });

  videos.forEach((v, i) => {
    v.addEventListener('timeupdate', () => {
      if (switching) return;
      if (i !== idx) return;
      if (!v.duration || isNaN(v.duration)) return;
      if (v.currentTime >= v.duration - OVERLAP_S) {
        switching = true;
        const nextIdx = (i + 1) % videos.length;
        idx = nextIdx;
        showVideo(nextIdx);
        // Réautorise la bascule une fois le crossfade bien lancé
        setTimeout(() => { switching = false; }, 400);
      }
    });
    v.addEventListener('ended', () => {
      if (i !== idx || switching) return;
      switching = true;
      const nextIdx = (i + 1) % videos.length;
      idx = nextIdx;
      showVideo(nextIdx);
      setTimeout(() => { switching = false; }, 400);
    });
  });

  showVideo(0);
})();


/* ---------- 4. SCROLL REVEAL ---------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
      );
      const i = siblings.indexOf(entry.target);
      const delay = Math.min(i * 80, 320);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();


/* ---------- 5. STOCK — FILTRES ---------- */
(function () {
  const grid  = document.getElementById('stock-grid');
  if (!grid) return;

  const fOp      = document.getElementById('f-operation');
  const fType    = document.getElementById('f-type');
  const fBudget  = document.getElementById('f-budget');
  const fSurface = document.getElementById('f-surface');
  const count    = document.getElementById('stock-count');
  const empty    = document.getElementById('no-results');
  const reset1   = document.getElementById('btn-reset');
  const reset2   = document.getElementById('btn-reset-alt');

  function apply() {
    const op = fOp.value, t = fType.value, b = fBudget.value, s = fSurface.value;
    const cards = grid.querySelectorAll('.lot-card');
    let shown = 0;

    cards.forEach(c => {
      const ok =
        (!op || c.dataset.operation === op) &&
        (!t  || c.dataset.type      === t)  &&
        (!b  || c.dataset.budget    === b)  &&
        (!s  || c.dataset.surface   === s);
      c.hidden = !ok;
      if (ok) shown++;
    });

    const filtered = op || t || b || s;
    count.textContent = filtered
      ? `${shown} bien${shown !== 1 ? 's' : ''} trouvé${shown !== 1 ? 's' : ''}`
      : `${shown} bien${shown !== 1 ? 's' : ''} disponible${shown !== 1 ? 's' : ''}`;

    empty.hidden = shown > 0;
  }

  function resetAll() {
    fOp.value = fType.value = fBudget.value = fSurface.value = '';
    apply();
  }

  [fOp, fType, fBudget, fSurface].forEach(el => el.addEventListener('change', apply));
  reset1.addEventListener('click', resetAll);
  if (reset2) reset2.addEventListener('click', resetAll);

  apply();
})();


/* ---------- 6. CTA PRÉ-REMPLISSAGE ---------- */
(function () {
  // Lorsque l'utilisateur clique « Demander une info » sur un lot,
  // on stocke l'intitulé pour pré-remplir le formulaire contact.
  document.querySelectorAll('.listing-cta').forEach(cta => {
    cta.addEventListener('click', (e) => {
      const card = cta.closest('.lot-card, .op-row');
      if (!card) return;
      const title = card.querySelector('.lot-card__title, h2, .op-row__body h2')?.textContent?.trim() || '';
      const ref   = card.dataset.ref || '';
      try {
        sessionStorage.setItem('ad-contact-ref', JSON.stringify({ title, ref, objet: 'Bien à vendre' }));
      } catch (_) {}
    });
  });

  // Sur la page contact, on hydrate si présent
  const form = document.getElementById('contact-form');
  if (!form) return;
  try {
    const raw = sessionStorage.getItem('ad-contact-ref');
    if (!raw) return;
    const { title, ref, objet } = JSON.parse(raw);
    const selObjet = document.getElementById('objet');
    const inpRef   = document.getElementById('reference');
    if (selObjet && objet) selObjet.value = objet;
    if (inpRef && title)   inpRef.value   = title + (ref ? ` (${ref})` : '');
    sessionStorage.removeItem('ad-contact-ref');
  } catch (_) {}
})();


/* ---------- 7. FORM VALIDATION + MAILTO ---------- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const ok   = document.getElementById('form-success');

  const FIELDS = [
    { id: 'prenom',  err: 'prenom-err',  msg: 'Veuillez saisir votre prénom.' },
    { id: 'nom',     err: 'nom-err',     msg: 'Veuillez saisir votre nom.' },
    { id: 'email',   err: 'email-err',   msg: 'Veuillez saisir une adresse email valide.' },
    { id: 'objet',   err: 'objet-err',   msg: 'Veuillez sélectionner un objet.' },
    { id: 'message', err: 'message-err', msg: 'Veuillez rédiger votre message.' },
  ];

  function clearErrors() {
    FIELDS.forEach(({ id, err }) => {
      document.getElementById(id)?.classList.remove('error');
      const e = document.getElementById(err);
      if (e) e.textContent = '';
    });
  }

  function validate() {
    let valid = true, firstInvalid = null;
    FIELDS.forEach(({ id, err, msg }) => {
      const el = document.getElementById(id);
      if (!el) return;
      let okField = el.value.trim() !== '';
      if (id === 'email' && okField) {
        okField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      }
      if (!okField) {
        el.classList.add('error');
        const e = document.getElementById(err);
        if (e) e.textContent = msg;
        if (!firstInvalid) firstInvalid = el;
        valid = false;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  FIELDS.forEach(({ id, err }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const e = document.getElementById(err);
      if (e) e.textContent = '';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;

    const d = new FormData(form);
    const get = k => (d.get(k) || '').toString().trim();
    const prenom = get('prenom'), nom = get('nom'), email = get('email');
    const tel = get('telephone'), objet = get('objet');
    const ref = get('reference'), message = get('message');

    const subject = `[Arthaud Développement] ${objet} — ${prenom} ${nom}`;
    const body =
      `Prénom : ${prenom}\n` +
      `Nom    : ${nom}\n` +
      `Email  : ${email}\n` +
      (tel ? `Tél.   : ${tel}\n` : '') +
      `Objet  : ${objet}\n` +
      (ref ? `Référence : ${ref}\n` : '') +
      `\nMessage :\n${message}`;

    window.location.href =
      `mailto:contact@arthaud-developpement.fr` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    ok.hidden = false;
    form.reset();
    setTimeout(() => { ok.hidden = true; }, 7000);
  });
})();


/* ---------- 7b. LOT DETAIL MODAL — clic sur une carte stock ---------- */
(function () {
  const cards = document.querySelectorAll('.lot-card');
  if (!cards.length) return;

  // Construction du modal
  const modal = document.createElement('div');
  modal.className = 'lot-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="lot-modal__panel" role="document">
      <button type="button" class="lot-modal__close" aria-label="Fermer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="lot-modal__inner">
        <header class="lot-modal__head">
          <div class="lot-modal__op"></div>
          <h2 class="lot-modal__title"></h2>
          <p class="lot-modal__price"></p>
        </header>
        <div class="lot-modal__body"></div>
        <div class="lot-modal__cta">
          <a href="contact.html" class="btn btn--primary listing-cta">Demander une information</a>
          <a href="contact.html" class="btn btn--outline listing-cta">Visiter sur rendez-vous</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const panel    = modal.querySelector('.lot-modal__panel');
  const opEl     = modal.querySelector('.lot-modal__op');
  const titleEl  = modal.querySelector('.lot-modal__title');
  const priceEl  = modal.querySelector('.lot-modal__price');
  const bodyEl   = modal.querySelector('.lot-modal__body');
  const closeBtn = modal.querySelector('.lot-modal__close');
  const ctaWrap  = modal.querySelector('.lot-modal__cta');

  let lastFocused = null;

  function open(card) {
    const tpl = card.querySelector('template.lot-detail');
    if (!tpl) return;

    opEl.textContent    = card.querySelector('.lot-card__op')?.textContent || '';
    titleEl.textContent = card.querySelector('.lot-card__title')?.textContent || '';
    priceEl.innerHTML   = card.querySelector('.lot-card__price')?.innerHTML || '';

    bodyEl.innerHTML = '';
    bodyEl.appendChild(tpl.content.cloneNode(true));

    // Mémorise la référence pour pré-remplir le contact
    ctaWrap.dataset.ref = card.dataset.ref || '';
    ctaWrap.querySelectorAll('.listing-cta').forEach(a => {
      a.dataset.ref = card.dataset.ref || '';
    });

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lot-modal-open');
    closeBtn.focus();

    // Branche la lightbox sur les nouvelles photos
    bodyEl.querySelectorAll('.lot-detail__photos img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img, bodyEl));
    });
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lot-modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function openLightbox(img, scope) {
    // Construit dynamiquement un set d'images du conteneur courant et déclenche
    // l'ouverture de la lightbox via un événement custom (voir module 8).
    const evt = new CustomEvent('lot-photo-zoom', {
      detail: { trigger: img, scope }
    });
    document.dispatchEvent(evt);
  }

  // Bind cartes
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', (e) => {
      // Ne pas ouvrir le modal si on a cliqué directement sur le CTA
      if (e.target.closest('.lot-card__cta, .listing-cta')) return;
      e.preventDefault();
      open(card);
    });
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.lot-card__cta')) {
        e.preventDefault();
        open(card);
      }
    });
  });

  // Fermeture
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  // Permet aux CTA du modal de remplir le formulaire de contact
  ctaWrap.querySelectorAll('.listing-cta').forEach(cta => {
    cta.addEventListener('click', () => {
      const title = titleEl.textContent.trim();
      const ref   = ctaWrap.dataset.ref || '';
      try {
        sessionStorage.setItem('ad-contact-ref', JSON.stringify({ title, ref, objet: 'Bien à vendre' }));
      } catch (_) {}
    });
  });
})();


/* ---------- 8. LIGHTBOX — clic sur les photos des galeries / modaux ---------- */
(function () {
  // Sélectionne toutes les images cliquables :
  // - vignettes des galeries d'opérations / réalisations
  // - image principale (hero) de chaque op-row : on l'ajoute aux triggers et
  //   on la relie à la galerie de son op-block pour naviguer dans toutes les photos
  const triggers = document.querySelectorAll(
    '.gallery-strip__item img, .op-row__media img'
  );
  // On poursuit même s'il n'y a pas de galerie : la lightbox doit aussi répondre
  // aux événements émis par le modal détail des lots (page stock).

  // Construction de l'overlay
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Visualiseur de photo');
  lb.innerHTML = `
    <span class="lightbox__counter" aria-live="polite">1 / 1</span>
    <button type="button" class="lightbox__close" aria-label="Fermer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Photo précédente">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Photo suivante">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="lightbox__stage">
      <img class="lightbox__img" alt="">
    </div>
    <p class="lightbox__caption"></p>
  `;
  document.body.appendChild(lb);

  const imgEl     = lb.querySelector('.lightbox__img');
  const counterEl = lb.querySelector('.lightbox__counter');
  const captionEl = lb.querySelector('.lightbox__caption');
  const closeBtn  = lb.querySelector('.lightbox__close');
  const prevBtn   = lb.querySelector('.lightbox__nav--prev');
  const nextBtn   = lb.querySelector('.lightbox__nav--next');
  const stage     = lb.querySelector('.lightbox__stage');

  let currentSet  = []; // tableau d'objets {src, alt}
  let currentIdx  = 0;
  let lastFocused = null;

  function update() {
    if (!currentSet.length) return;
    const item = currentSet[currentIdx];
    imgEl.classList.add('is-loading');

    // Précharge avant d'afficher pour éviter le flash
    const pre = new Image();
    pre.onload = pre.onerror = () => {
      imgEl.src = item.src;
      imgEl.alt = item.alt || '';
      imgEl.classList.remove('is-loading');
    };
    pre.src = item.src;

    counterEl.textContent = `${currentIdx + 1} / ${currentSet.length}`;
    captionEl.textContent = item.alt || '';
    captionEl.style.display = item.alt ? '' : 'none';

    prevBtn.disabled = currentSet.length <= 1;
    nextBtn.disabled = currentSet.length <= 1;
  }

  function open(trigger, scopeEl) {
    // Regroupement : scope explicite > galerie de l'op-block parent
    // > .lot-detail__photos > .gallery-strip > image seule
    let scope = scopeEl;
    if (!scope) {
      if (trigger.closest('.op-row__media')) {
        // L'image hero d'une op-row : on prend la galerie de l'op-block parent
        const block = trigger.closest('.op-block');
        scope = block ? block.querySelector('.gallery-strip') : null;
      } else {
        scope = trigger.closest('.lot-detail__photos')
             || trigger.closest('.gallery-strip');
      }
    }
    const imgs = scope
      ? Array.from(scope.querySelectorAll('img'))
      : [trigger];

    currentSet = imgs.map(i => ({
      src: i.currentSrc || i.src,
      alt: i.alt || ''
    }));
    // Pour l'image hero, on essaie de pointer sur la même photo dans la galerie
    currentIdx = imgs.indexOf(trigger);
    if (currentIdx < 0) {
      const triggerSrc = trigger.currentSrc || trigger.src;
      currentIdx = imgs.findIndex(i => (i.currentSrc || i.src) === triggerSrc);
    }
    if (currentIdx < 0) currentIdx = 0;

    lastFocused = document.activeElement;
    lb.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    update();
    closeBtn.focus();
  }

  // Écoute les demandes d'ouverture émises par d'autres modules (ex: modal lot)
  document.addEventListener('lot-photo-zoom', (e) => {
    if (e.detail && e.detail.trigger) open(e.detail.trigger, e.detail.scope);
  });

  function close() {
    lb.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    // Libère la mémoire de la grande image
    setTimeout(() => { if (!lb.classList.contains('is-open')) imgEl.removeAttribute('src'); }, 300);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function next() {
    if (!currentSet.length) return;
    currentIdx = (currentIdx + 1) % currentSet.length;
    update();
  }

  function prev() {
    if (!currentSet.length) return;
    currentIdx = (currentIdx - 1 + currentSet.length) % currentSet.length;
    update();
  }

  // Bind triggers
  triggers.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      open(img);
    });
  });

  // Contrôles
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  imgEl.addEventListener('click', close);

  // Clic sur le fond (mais pas sur les contrôles ni l'image) → fermer
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Clavier
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    switch (e.key) {
      case 'Escape':     e.preventDefault(); close(); break;
      case 'ArrowRight': e.preventDefault(); next();  break;
      case 'ArrowLeft':  e.preventDefault(); prev();  break;
    }
  });

  // Swipe tactile (gauche/droite) pour naviguer sur mobile
  let touchStartX = 0;
  let touchStartY = 0;
  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
  });
})();


/* ---------- 9. SMOOTH SCROLL — ancres internes ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
