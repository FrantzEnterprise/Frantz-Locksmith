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

// ADA Inline Toggles (simple, no floating widget)
function toggleTextSize() {
  document.body.classList.toggle('ada-large-text');
  document.querySelectorAll('.ada-btn[onclick*="toggleTextSize"]').forEach(function(b) { b.classList.toggle('active'); });
  try { localStorage.setItem('frantz_ada_text_size', document.body.classList.contains('ada-large-text') ? 'large' : 'normal'); } catch(e) {}
}

function toggleContrast() {
  document.body.classList.toggle('ada-high-contrast');
  document.querySelectorAll('.ada-btn[onclick*="toggleContrast"]').forEach(function(b) { b.classList.toggle('active'); });
  try { localStorage.setItem('frantz_ada_contrast', document.body.classList.contains('ada-high-contrast') ? 'high' : 'normal'); } catch(e) {}
}

(function() {
  try {
    if (localStorage.getItem('frantz_ada_text_size') === 'large') { document.body.classList.add('ada-large-text'); document.querySelectorAll('.ada-btn[onclick*="toggleTextSize"]').forEach(function(b) { b.classList.add('active'); }); }
    if (localStorage.getItem('frantz_ada_contrast') === 'high') { document.body.classList.add('ada-high-contrast'); document.querySelectorAll('.ada-btn[onclick*="toggleContrast"]').forEach(function(b) { b.classList.add('active'); }); }
  } catch(e) {}
})();
