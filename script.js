/* =============================================
   Frantz Locksmith Service - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('open');
      navList.classList.toggle('open');
      const expanded = this.classList.contains('open');
      this.setAttribute('aria-expanded', expanded);
    });

    // Close nav when clicking a link (mobile)
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('open');
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('open');
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Header Shrink on Scroll ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }

    lastScroll = currentScroll;
  });

  // --- Contact Form Handler ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      // Mailto fallback - build a simple mailto link
      const name = data.firstName + ' ' + data.lastName;
      const subject = encodeURIComponent('Service Request from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Address: ' + (data.address || 'N/A') + '\n' +
        'City: ' + (data.city || 'N/A') + '\n' +
        'ZIP: ' + (data.zip || 'N/A') + '\n' +
        'Phone: ' + (data.phone || 'N/A') + '\n' +
        'Email: ' + (data.email || 'N/A') + '\n\n' +
        'Message:\n' + (data.message || 'N/A')
      );

      // Show success message
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';

      // Open email client with pre-filled message
      window.location.href = 'mailto:frantzlocksmith@hotmail.com?subject=' + subject + '&body=' + body;
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Lazy loading fallback for older browsers ---
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported - do nothing, it's already in the HTML
  } else {
    // Fallback: load all images immediately
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.src;
    });
  }

  // --- Year auto-update in footer ---
  const yearSpans = document.querySelectorAll('.current-year');
  if (yearSpans.length) {
    yearSpans.forEach(span => { span.textContent = new Date().getFullYear(); });
  }

  console.log('Frantz Locksmith Service - Site loaded');
});

// =============================================
// Cookie Consent Banner
// =============================================
(function() {
  const COOKIE_CONSENT_KEY = 'frantz_cookie_consent';

  function getCookieConsent() {
    try { return localStorage.getItem(COOKIE_CONSENT_KEY); } catch(e) { return null; }
  }

  function setCookieConsent(value) {
    try { localStorage.setItem(COOKIE_CONSENT_KEY, value); } catch(e) {}
  }

  function showConsentBanner() {
    if (getCookieConsent()) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.id = 'cookieConsent';
    banner.innerHTML =
      '<div class="container">' +
        '<p>This website uses minimal cookies for basic functionality and accessibility preferences. <a href="disclaimers.html">Learn more</a>.</p>' +
        '<div class="cookie-buttons">' +
          '<button class="cookie-btn cookie-btn-accept" id="cookieAccept">Accept</button>' +
          '<button class="cookie-btn cookie-btn-reject" id="cookieReject">Reject</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    setTimeout(function() { banner.classList.add('active'); }, 100);

    document.getElementById('cookieAccept').addEventListener('click', function() {
      setCookieConsent('accepted');
      banner.classList.remove('active');
      setTimeout(function() { banner.remove(); }, 400);
    });

    document.getElementById('cookieReject').addEventListener('click', function() {
      setCookieConsent('rejected');
      banner.classList.remove('active');
      setTimeout(function() { banner.remove(); }, 400);
    });
  }

  document.addEventListener('DOMContentLoaded', showConsentBanner);
})();

// =============================================
// ADA Accessibility Widget
// =============================================
(function() {
  function adaTextSize() {
    document.body.classList.toggle('ada-large-text');
    var active = document.body.classList.contains('ada-large-text');
    document.querySelectorAll('.ada-toggle').forEach(function(t) {
      if (t.getAttribute('data-option') === 'text-size') {
        if (active) t.classList.add('active'); else t.classList.remove('active');
      }
    });
    try { localStorage.setItem('frantz_ada_text_size', active ? 'large' : 'normal'); } catch(e) {}
  }

  function adaHighContrast() {
    document.body.classList.toggle('ada-high-contrast');
    var active = document.body.classList.contains('ada-high-contrast');
    document.querySelectorAll('.ada-toggle').forEach(function(t) {
      if (t.getAttribute('data-option') === 'contrast') {
        if (active) t.classList.add('active'); else t.classList.remove('active');
      }
    });
    try { localStorage.setItem('frantz_ada_contrast', active ? 'high' : 'normal'); } catch(e) {}
  }

  function buildWidget() {
    if (document.querySelector('.ada-widget')) return;

    var widget = document.createElement('a');
    widget.className = 'ada-widget';
    widget.href = '#';
    widget.setAttribute('aria-label', 'Accessibility options');
    widget.setAttribute('role', 'button');
    widget.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#fff">' +
        '<path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1 7.93A7 7 0 0 0 5 16.5v.5a1 1 0 0 0 1 1h.18a7 7 0 0 1 11.64 0H18a1 1 0 0 0 1-1v-.5a7 7 0 0 0-6-6.57V9H11v.93zM12 12a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z"/>' +
        '<circle cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="1.5"/>' +
      '</svg>' +
      '<span class="ada-tooltip">Accessibility Options</span>';

    var panel = document.createElement('div');
    panel.className = 'ada-panel';
    panel.id = 'adaPanel';
    panel.innerHTML =
      '<button class="ada-close" id="adaClose" aria-label="Close accessibility panel">&times;</button>' +
      '<h3>Accessibility Options</h3>' +
      '<div class="ada-option">' +
        '<span>Large Text</span>' +
        '<button class="ada-toggle" data-option="text-size" aria-label="Toggle large text"></button>' +
      '</div>' +
      '<div class="ada-option">' +
        '<span>High Contrast</span>' +
        '<button class="ada-toggle" data-option="contrast" aria-label="Toggle high contrast"></button>' +
      '</div>' +
      '<div style="margin-top:12px;font-size:0.8rem;color:#999;">' +
        '<p>We strive to make this site accessible for all users.</p>' +
      '</div>';

    document.body.appendChild(widget);
    document.body.appendChild(panel);

    try {
      if (localStorage.getItem('frantz_ada_text_size') === 'large') document.body.classList.add('ada-large-text');
      if (localStorage.getItem('frantz_ada_contrast') === 'high') document.body.classList.add('ada-high-contrast');
    } catch(e) {}

    var panelOpen = false;
    widget.addEventListener('click', function(e) {
      e.preventDefault();
      panelOpen = !panelOpen;
      if (panelOpen) panel.classList.add('active'); else panel.classList.remove('active');
      document.querySelectorAll('.ada-toggle').forEach(function(t) {
        if (t.getAttribute('data-option') === 'text-size') {
          if (document.body.classList.contains('ada-large-text')) t.classList.add('active'); else t.classList.remove('active');
        }
        if (t.getAttribute('data-option') === 'contrast') {
          if (document.body.classList.contains('ada-high-contrast')) t.classList.add('active'); else t.classList.remove('active');
        }
      });
    });

    document.querySelectorAll('.ada-toggle').forEach(function(t) {
      t.addEventListener('click', function(e) {
        e.stopPropagation();
        if (this.getAttribute('data-option') === 'text-size') adaTextSize();
        if (this.getAttribute('data-option') === 'contrast') adaHighContrast();
      });
    });

    document.getElementById('adaClose').addEventListener('click', function() {
      panelOpen = false;
      panel.classList.remove('active');
    });

    document.addEventListener('click', function(e) {
      if (panelOpen && !panel.contains(e.target) && !widget.contains(e.target)) {
        panelOpen = false;
        panel.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', buildWidget);
})();
