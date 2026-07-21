'use strict';
/* ===========================================================
   ARTHAUD DÉVELOPPEMENT — consent.js
   Bandeau de consentement cookies (RGPD) + Consent Mode v2
   Sans dépendance externe · stockage localStorage
   =========================================================== */

(function () {
  var STORAGE_KEY = 'arthaud_consent';

  // gtag est défini dans le <head> ; on se protège au cas où.
  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function grantConsent() {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
  }

  function getChoice() {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }

  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); }
    catch (e) {}
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Consentement aux cookies');

    banner.innerHTML =
      '<div class="cookie-consent__inner">' +
        '<p class="cookie-consent__text">' +
          'Nous utilisons des cookies de mesure d\u2019audience et publicitaires afin ' +
          'd\u2019am\u00e9liorer votre exp\u00e9rience et nos campagnes. Vous pouvez accepter ou refuser leur d\u00e9p\u00f4t.' +
        '</p>' +
        '<div class="cookie-consent__actions">' +
          '<button type="button" class="btn btn--sm btn--outline" data-consent-decline>Refuser</button>' +
          '<button type="button" class="btn btn--sm btn--primary" data-consent-accept>Accepter</button>' +
        '</div>' +
      '</div>';

    return banner;
  }

  function removeBanner(banner) {
    banner.classList.remove('is-visible');
    window.setTimeout(function () {
      if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    }, 300);
  }

  function init() {
    // Un choix a déjà été fait : le replay "accepted" est géré dans le <head>.
    if (getChoice()) return;

    var banner = buildBanner();
    document.body.appendChild(banner);

    banner.querySelector('[data-consent-accept]').addEventListener('click', function () {
      saveChoice('accepted');
      grantConsent();
      removeBanner(banner);
    });

    banner.querySelector('[data-consent-decline]').addEventListener('click', function () {
      // Les défauts restent "denied" — on enregistre simplement le refus.
      saveChoice('denied');
      removeBanner(banner);
    });

    // Affichage après insertion pour permettre la transition d'entrée.
    window.requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
