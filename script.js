/* ═══════════════════════════════════════════════════════════════
   BORJA CANDEL — Portfolio Script v2
   Theme toggle, tooltip system, enhanced canvas, scroll reveal,
   typed text, navbar, mobile menu, counters, copy email, toast
   ═══════════════════════════════════════════════════════════════ */

; (function () {
  'use strict';

  /* ─── Helpers ─────────────────────────────────────────── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ═══════════════════════════════════════════════════════════
     HERO CANVAS — Network Nodes
     ═══════════════════════════════════════════════════════════ */
  const canvas = $('#heroCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let nodes = [];
  let mouseX = -9999, mouseY = -9999;

  const CFG = {
    nodeCount: 90,
    maxDist: 155,
    speed: 0.28,
    nodeRadius: 1.6,
    lineWidth: 0.45,
    mouseRadius: 190,
  };

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function getNodeColor(alpha) {
    return isDark()
      ? `rgba(0, 212, 255, ${alpha})`
      : `rgba(0, 150, 200, ${alpha})`;
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  function initNodes() {
    nodes = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const count = w < 768 ? Math.round(CFG.nodeCount * 0.45) : CFG.nodeCount;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * CFG.speed,
        vy: (Math.random() - 0.5) * CFG.speed,
        r: CFG.nodeRadius + Math.random() * 1.2,
      });
    }
  }

  function drawNetwork() {
    if (!ctx) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      const dx = n.x - mouseX;
      const dy = n.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CFG.mouseRadius) {
        const force = (CFG.mouseRadius - dist) / CFG.mouseRadius * 0.02;
        n.vx += dx * force;
        n.vy += dy * force;
        const maxV = CFG.speed * 3;
        n.vx = Math.max(-maxV, Math.min(maxV, n.vx));
        n.vy = Math.max(-maxV, Math.min(maxV, n.vy));
      }
    }

    /* Lines */
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.maxDist) {
          const alpha = (1 - dist / CFG.maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = getNodeColor(alpha);
          ctx.lineWidth = CFG.lineWidth;
          ctx.stroke();
        }
      }
    }

    /* Nodes */
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = getNodeColor(0.55);
      ctx.fill();
      /* Glow ring */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 3.5, 0, Math.PI * 2);
      ctx.fillStyle = getNodeColor(0.06);
      ctx.fill();
    }

    requestAnimationFrame(drawNetwork);
  }

  function initCanvas() {
    if (!canvas) return;
    resizeCanvas();
    initNodes();
    drawNetwork();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        initNodes();
      }, 200);
    });

    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouseX = mouseY = -9999;
    });

    /* Touch support for mobile */
    canvas.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      const r = canvas.getBoundingClientRect();
      mouseX = t.clientX - r.left;
      mouseY = t.clientY - r.top;
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      mouseX = mouseY = -9999;
    });
  }

  /* ═══════════════════════════════════════════════════════════
     TYPED ROLE ANIMATION
     ═══════════════════════════════════════════════════════════ */
  const ROLES = [
    'Técnico de Sistemas y Redes',
    'Estudiante de ASIR',
    'Infraestructura IT',
    'Ciberseguridad',
    'Administración de Sistemas',
    'Soporte Técnico',
  ];

  function initTypedRole() {
    const el = $('#typedRole');
    if (!el) return;
    let rIdx = 0, cIdx = 0, deleting = false, pause = 0;

    function tick() {
      const current = ROLES[rIdx];
      if (!deleting) {
        cIdx++;
        el.textContent = current.substring(0, cIdx);
        if (cIdx === current.length) { pause = 2400; deleting = true; }
        else pause = 55 + Math.random() * 30;
      } else {
        cIdx--;
        el.textContent = current.substring(0, cIdx);
        if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % ROLES.length; pause = 350; }
        else pause = 30;
      }
      setTimeout(tick, pause);
    }
    setTimeout(tick, 700);
  }

  /* ═══════════════════════════════════════════════════════════
     THEME TOGGLE
     ═══════════════════════════════════════════════════════════ */
  function initThemeToggle() {
    const btn = $('#themeToggle');
    if (!btn) return;

    /* Restore saved theme or default dark */
    const saved = localStorage.getItem('bc-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    btn.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('bc-theme', next);
      /* Update meta theme-color */
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.content = next === 'dark' ? '#080b14' : '#f0f2f8';
    });
  }

  /* ═══════════════════════════════════════════════════════════
     NAVBAR
     ═══════════════════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = $('#navbar');
    if (!navbar) return;
    const links = $$('.nav-links a');
    const sections = $$('section[id]');
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        navbar.classList.toggle('scrolled', sy > 50);

        let current = '';
        for (const sec of sections) {
          if (sy >= sec.offsetTop - 130) current = sec.id;
        }
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ═══════════════════════════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════════════════════════ */
  function initMobileMenu() {
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    $$('a', links).forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL
     ═══════════════════════════════════════════════════════════ */
  function initReveal() {
    const els = $$('.anim-reveal');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('revealed');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );
      els.forEach(el => obs.observe(el));
    } else {
      els.forEach(el => el.classList.add('revealed'));
    }
  }

  /* ═══════════════════════════════════════════════════════════
     STAGGER CHILDREN
     ═══════════════════════════════════════════════════════════ */
  function initStagger() {
    $$('.skill-category, .edu-card, .stat-card').forEach((card, i) => {
      const cls = `stagger-${(i % 5) + 1}`;
      card.classList.add(cls);
    });

    $$('.skill-category').forEach(cat => {
      $$('.skill-tag', cat).forEach((tag, j) => {
        tag.style.transitionDelay = `${j * 40}ms`;
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     ANIMATED COUNTERS
     ═══════════════════════════════════════════════════════════ */
  function initCounters() {
    const items = $$('[data-count]');
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateNum(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    items.forEach(el => obs.observe(el));
  }

  function animateNum(el) {
    const target = parseInt(el.dataset.count, 10);
    const dur = 1800;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════════════════════
     SKILL TOOLTIP
     ═══════════════════════════════════════════════════════════ */
  function initTooltip() {
    const tip = $('#skillTooltip');
    if (!tip) return;

    let activeTag = null;
    let hideTimer = null;

    function showTip(tag) {
      clearTimeout(hideTimer);
      const text = tag.getAttribute('data-tooltip');
      if (!text) return;
      activeTag = tag;
      tip.textContent = text;
      tip.setAttribute('aria-hidden', 'false');

      /* Position tooltip centered below/above the tag */
      const rect = tag.getBoundingClientRect();
      const tipW = 340;

      let left = rect.left + rect.width / 2 - tipW / 2;
      if (left < 12) left = 12;
      if (left + tipW > window.innerWidth - 12) left = window.innerWidth - tipW - 12;

      /* Arrow position: relative to skill tag center */
      const arrowLeft = Math.max(16, Math.min(tipW - 16, rect.left + rect.width / 2 - left));
      tip.style.setProperty('--arrow-left', arrowLeft + 'px');

      let top = rect.bottom + 12;
      let above = false;
      /* Check if tooltip would go below viewport */
      if (top + 140 > window.innerHeight) {
        top = rect.top - 12;
        above = true;
      }

      tip.style.left = left + 'px';
      tip.style.maxWidth = tipW + 'px';

      if (above) {
        tip.style.top = '';
        tip.style.bottom = (window.innerHeight - top) + 'px';
      } else {
        tip.style.bottom = '';
        tip.style.top = top + 'px';
      }
      tip.classList.toggle('above', above);

      requestAnimationFrame(() => tip.classList.add('visible'));
    }

    function hideTip() {
      hideTimer = setTimeout(() => {
        tip.classList.remove('visible');
        tip.setAttribute('aria-hidden', 'true');
        activeTag = null;
      }, 120);
    }

    /* Desktop hover */
    $$('.skill-tag[data-tooltip]').forEach(tag => {
      tag.addEventListener('mouseenter', () => showTip(tag));
      tag.addEventListener('mouseleave', hideTip);
      tag.addEventListener('focus', () => showTip(tag));
      tag.addEventListener('blur', hideTip);
      /* Make focusable for accessibility */
      tag.setAttribute('tabindex', '0');
      tag.setAttribute('role', 'button');
    });

    /* Mobile tap */
    $$('.skill-tag[data-tooltip]').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeTag === tag) {
          hideTip();
        } else {
          showTip(tag);
        }
      });
    });

    /* Close tooltip on outside click (mobile) */
    document.addEventListener('click', () => {
      if (activeTag) hideTip();
    });
  }


  /* ═══════════════════════════════════════════════════════════
     TOAST
     ═══════════════════════════════════════════════════════════ */
  let toastTimer;
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ═══════════════════════════════════════════════════════════
     SMOOTH SCROLL
     ═══════════════════════════════════════════════════════════ */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = $(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     PARALLAX GLOW ORBS (subtle mouse follow)
     ═══════════════════════════════════════════════════════════ */
  function initParallaxGlow() {
    const g1 = $('.hero-glow--1');
    const g2 = $('.hero-glow--2');
    if (!g1 || !g2 || window.innerWidth < 768) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      g1.style.transform = `translate(${x * 25}px, ${y * 20}px)`;
      g2.style.transform = `translate(${-x * 20}px, ${-y * 25}px)`;
    });
  }

  /* ═══════════════════════════════════════════════════════════
     EXPANDABLE TASKS
     ═══════════════════════════════════════════════════════════ */
  function initExpandableTasks() {
    $$('.task-expandable').forEach(item => {
      const title = $('.task-title', item);
      if (!title) return;
      title.addEventListener('click', () => {
        const expanded = item.getAttribute('data-expanded') === 'true';
        item.setAttribute('data-expanded', expanded ? 'false' : 'true');
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════════════════ */
  function init() {
    initThemeToggle();
    initCanvas();
    initTypedRole();
    initNavbar();
    initMobileMenu();
    initReveal();
    initStagger();
    initCounters();
    initTooltip();
    initSmoothScroll();
    initParallaxGlow();
    initExpandableTasks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
