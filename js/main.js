/* ============================================================
   ALEX ALLPER PORTFOLIO — GLOBAL JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV: switch between dark/light based on scroll position ──
  const nav = document.getElementById('main-nav') || document.querySelector('.nav');
  const hero = document.querySelector('.home-hero, .client-hero, .about-hero, .contact-hero');

  if (nav && hero) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        nav.classList.add('nav--dark');
      } else {
        nav.classList.remove('nav--dark');
      }
    }, { threshold: 0.1 });
    observer.observe(hero);
    nav.classList.add('nav--dark');
  }

  // ── NAV: mark active link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── FADE UP: animate elements into view ──
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => {
      el.style.animationPlayState = 'paused';
      fadeObserver.observe(el);
    });
  }

  // ── GRID HOVER: Option B — deep darken, text pops ──
  document.querySelectorAll('.grid-box').forEach(box => {
    const bg = box.querySelector('.grid-box__bg');
    const content = box.querySelector('.grid-box__content');
    const stat = box.querySelector('.grid-box__stat');
    const headline = box.querySelector('.grid-box__headline');

    // Create dark overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;background:rgba(26,26,24,0.45);transition:background 0.35s ease;z-index:1;pointer-events:none;';
    box.insertBefore(overlay, box.firstChild);

    // Create green line
    const line = document.createElement('div');
    line.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:3px;background:#52B788;transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease;z-index:4;pointer-events:none;';
    box.appendChild(line);

    // Set transitions
    if (bg) bg.style.transition = 'transform 0.5s ease';
    if (stat) stat.style.transition = 'color 0.3s ease';
    if (headline) headline.style.transition = 'color 0.3s ease';
    if (content) content.style.zIndex = '3';

    box.addEventListener('mouseenter', () => {
      overlay.style.background = 'rgba(26,26,24,0.85)';
      if (bg) bg.style.transform = 'scale(1.05)';
      if (stat) stat.style.color = '#ffffff';
      if (headline) headline.style.color = 'rgba(245,240,232,0.8)';
      line.style.transform = 'scaleX(1)';
    });

    box.addEventListener('mouseleave', () => {
      overlay.style.background = 'rgba(26,26,24,0.45)';
      if (bg) bg.style.transform = 'scale(1)';
      if (stat) stat.style.color = '#F5F0E8';
      if (headline) headline.style.color = 'rgba(245,240,232,0.5)';
      line.style.transform = 'scaleX(0)';
    });
  });

});
