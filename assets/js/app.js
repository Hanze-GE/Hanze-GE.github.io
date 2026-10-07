/* Small progressive-enhancement layer. No dependencies, no network. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paintTheme() {
    if (!themeBtn) return;
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', dark
      ? (root.lang === 'en' ? 'Switch to light theme' : '切换到浅色主题')
      : (root.lang === 'en' ? 'Switch to dark theme' : '切换到深色主题'));
    var sun = themeBtn.querySelector('[data-icon="sun"]');
    var moon = themeBtn.querySelector('[data-icon="moon"]');
    if (sun && moon) { sun.hidden = !dark; moon.hidden = dark; }
  }
  if (themeBtn) {
    paintTheme();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      paintTheme();
    });
  }

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.setAttribute('data-open', open ? 'true' : 'false');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (navToggle && nav) {
    setNav(false);
    navToggle.addEventListener('click', function () {
      setNav(nav.getAttribute('data-open') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------- copy e-mail ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var done = function () {
        var old = btn.getAttribute('data-label') || btn.textContent;
        btn.setAttribute('data-label', old);
        btn.textContent = root.lang === 'en' ? 'Copied' : '已复制';
        setTimeout(function () { btn.textContent = old; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, function () { /* ignore */ });
      } else {
        var ta = document.createElement('textarea');
        ta.value = value; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- report table of contents ---------- */
  var toc = document.querySelector('[data-toc]');
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var heads = links
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);
    if (heads.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + entry.target.id;
            if (on) { a.setAttribute('aria-current', 'true'); a.style.color = ''; }
            else { a.removeAttribute('aria-current'); }
          });
        });
      }, { rootMargin: '-84px 0px -70% 0px', threshold: 0 });
      heads.forEach(function (h) { io.observe(h); });
    }
  }

  /* ---------- print ---------- */
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });

  /* ---------- year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
