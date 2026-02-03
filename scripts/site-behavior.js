(function () {
  const STORAGE_KEY = 'quarto-sidebar-state';

  function loadState() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (err) {
      return {};
    }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function syncSections(state) {
    const sections = document.querySelectorAll('#quarto-sidebar .sidebar-item-section');
    sections.forEach(section => {
      const collapse = section.querySelector('.collapse');
      const toggle = section.querySelector('.sidebar-item-toggle');
      if (!collapse || !toggle || !collapse.id) return;

      const stored = state[collapse.id];
      const hasActive = collapse.querySelector('.active') || section.querySelector('.active');

      // Only expand if explicitly stored as open OR contains active page
      // Do NOT auto-expand on first visit (no stored state)
      if (hasActive && stored !== false) {
        collapse.classList.add('show');
        toggle.classList.remove('collapsed');
        toggle.setAttribute('aria-expanded', 'true');
        state[collapse.id] = true;
      } else if (stored === true) {
        collapse.classList.add('show');
        toggle.classList.remove('collapsed');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        collapse.classList.remove('show');
        toggle.classList.add('collapsed');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function registerHandlers(state) {
    const sidebar = document.querySelector('#quarto-sidebar');
    if (!sidebar) return;

    sidebar.addEventListener('shown.bs.collapse', evt => {
      if (evt.target?.id) {
        state[evt.target.id] = true;
        saveState(state);
      }
    });

    sidebar.addEventListener('hidden.bs.collapse', evt => {
      if (evt.target?.id) {
        state[evt.target.id] = false;
        saveState(state);
      }
    });
  }

  function sortSidebarLists() {
    const collator = new Intl.Collator(['zh-CN', 'en'], {
      numeric: true,
      sensitivity: 'base',
      ignorePunctuation: true,
    });

    const normalize = (text) =>
      (text || '')
        .normalize('NFKC')
        .replace(/\s+/g, ' ')
        .trim();

    const getItemText = (li) => {
      const link = li.querySelector('.sidebar-item-text');
      return normalize(link ? link.textContent : li.textContent);
    };

    const sortList = (list) => {
      const children = Array.from(list.children).filter((el) =>
        el.classList.contains('sidebar-item') || el.classList.contains('sidebar-item-section')
      );
      if (children.length < 2) return;

      const pinned = [];
      const sortable = [];

      children.forEach((li, idx) => {
        const link = li.querySelector('.sidebar-item-text');
        const href = link?.getAttribute('href') || '';
        const isPinned =
          href.endsWith('/content/notes/理论/index.html') ||
          href.endsWith('/content/notes/理论/') ||
          href.endsWith('/content/notes/计算/index.html') ||
          href.endsWith('/content/notes/计算/');

        if (isPinned) pinned.push({ li, idx });
        else sortable.push({ li, idx });
      });

      const sorted = sortable
        .slice()
        .sort((a, b) => {
          const aText = getItemText(a.li);
          const bText = getItemText(b.li);
          const cmp = collator.compare(aText, bText);
          return cmp !== 0 ? cmp : a.idx - b.idx; // keep stable ordering for ties
        })
        .map((x) => x.li);

      const final = [...pinned.map((x) => x.li), ...sorted];
      const changed = final.some((li, i) => li !== children[i]);
      if (!changed) return;

      final.forEach((li) => list.appendChild(li));
    };

    const sidebarRoots = document.querySelectorAll(
      '#quarto-sidebar, .quarto-sidebar-toggle-contents'
    );
    sidebarRoots.forEach((sidebar) => {
      const lists = sidebar.querySelectorAll('.sidebar-menu-container ul.list-unstyled');
      lists.forEach(sortList);
    });
  }

  function disableHeadroom() {
    const header = document.getElementById('quarto-header');
    if (header?.headroom?.destroy) {
      header.headroom.destroy();
    }
  }

  function setupSidebarAutoHide() {
    const sidebar = document.querySelector('#quarto-sidebar');
    if (!sidebar) return;

    let hideTimeout;
    const HIDE_DELAY = 2000; // 2 seconds after cursor leaves

    // Show sidebar when mouse enters left side of screen or sidebar itself
    const showSidebar = () => {
      clearTimeout(hideTimeout);
      sidebar.classList.remove('sidebar-hidden');
    };

    // Hide sidebar after delay when mouse leaves
    const scheduleSidebarHide = () => {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        sidebar.classList.add('sidebar-hidden');
      }, HIDE_DELAY);
    };

    // Track mouse position for left edge detection
    document.addEventListener('mousemove', (e) => {
      if (e.clientX < 300) { // Left 300px of screen
        showSidebar();
      } else if (e.clientX > 400) { // Beyond sidebar area
        scheduleSidebarHide();
      }
    });

    // Keep sidebar visible when hovering over it
    sidebar.addEventListener('mouseenter', showSidebar);
    sidebar.addEventListener('mouseleave', scheduleSidebarHide);

    // Start with sidebar visible, then auto-hide after initial delay
    setTimeout(scheduleSidebarHide, 3000);
  }

  function setupCalloutZoom() {
    const backdrop = document.createElement('div');
    backdrop.className = 'callout-zoom-backdrop';

    let active = null;
    let resetTimeout = null;
    let openToken = 0;

    const clearZoom = () => {
      if (!active) return;
      const token = ++openToken;
      const target = active;
      target.classList.add('callout-zoom-closing');

      // Fade the backdrop immediately, but keep the callout above it (z-index)
      // until the fade completes to avoid a brief "darkening" color shift.
      if (backdrop.isConnected) backdrop.classList.remove('is-visible');

      let cleaned = false;
      const cleanupOnce = () => {
        if (cleaned || token !== openToken) return;
        cleaned = true;

        target.classList.remove('callout-zoom-closing');
        target.classList.remove('callout-zoomed');

        active = null;
        backdrop.remove();
        document.body.classList.remove('callout-zoom-active');
      };

      let pending = 0;
      const done = () => {
        if (token !== openToken) return;
        pending -= 1;
        if (pending <= 0) cleanupOnce();
      };

      pending += 1;
      target.addEventListener('transitionend', done, { once: true });

      if (backdrop.isConnected) {
        pending += 1;
        backdrop.addEventListener('transitionend', done, { once: true });
      }

      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(cleanupOnce, 500);
    };

    const openZoom = (callout) => {
      const token = ++openToken;

      // Scroll first (while page is still scrollable), then zoom.
      const rect = callout.getBoundingClientRect();
      const desiredTop =
        window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;

      window.scrollTo({
        top: Math.max(0, desiredTop),
        behavior: 'smooth',
      });

      const start = performance.now();
      const MAX_WAIT_MS = 800;
      const CENTER_EPS_PX = 8;

      const waitUntilCentered = () => {
        if (token !== openToken) return;
        const r = callout.getBoundingClientRect();
        const dy = r.top + r.height / 2 - window.innerHeight / 2;
        const done =
          Math.abs(dy) <= CENTER_EPS_PX ||
          performance.now() - start >= MAX_WAIT_MS;
        if (done) {
          active = callout;
          active.classList.remove('callout-zoom-closing');
          active.classList.add('callout-zoomed');
          document.body.classList.add('callout-zoom-active');
          if (!backdrop.isConnected) document.body.appendChild(backdrop);
          requestAnimationFrame(() => backdrop.classList.add('is-visible'));
          return;
        }
        requestAnimationFrame(waitUntilCentered);
      };

      requestAnimationFrame(waitUntilCentered);
    };

    backdrop.addEventListener('click', clearZoom);
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') clearZoom();
    });

    document.addEventListener('click', (evt) => {
      const callout = evt.target.closest('.math-theorem, .callout');
      if (!callout) return;
      if (evt.target.closest('a, button, input, textarea, select, label')) return;

      evt.preventDefault();
      evt.stopPropagation();

      if (active === callout) {
        clearZoom();
        return;
      }

      if (active && active !== callout) clearZoom();

      openZoom(callout);
    }, true);

    document.addEventListener('click', (evt) => {
      if (active && !active.contains(evt.target)) clearZoom();
    });
  }

  function syncScrollOffsets() {
    const header = document.getElementById('quarto-header');
    const height = header ? header.getBoundingClientRect().height : 56;
    const offset = Math.max(56, Math.round(height + 16)); // header + breathing room
    document.documentElement.style.setProperty('--scroll-offset', `${offset}px`);
  }

  function setupTocSpy() {
    const toc = document.querySelector('#TOC');
    if (!toc) return;

    const links = Array.from(toc.querySelectorAll('a[data-scroll-target]'));
    if (!links.length) return;

    const targets = links.map((link) => {
      const target = link.getAttribute('data-scroll-target');
      if (!target) return null;
      if (target.startsWith('#')) {
        return document.getElementById(decodeURI(target.slice(1)));
      }
      return document.querySelector(decodeURI(target));
    });

    let rafId = null;
    const update = () => {
      rafId = null;

      const offsetRaw = getComputedStyle(document.documentElement)
        .getPropertyValue('--scroll-offset')
        .trim();
      const offset = Number.parseFloat(offsetRaw) || 0;
      const threshold = offset + 1;

      let activeIdx = 0;

      // If we are at (or very near) the bottom, force the last item active.
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2) {
        activeIdx = links.length - 1;
      } else {
        for (let i = 0; i < targets.length; i++) {
          const el = targets[i];
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top - threshold <= 0) activeIdx = i;
          else break; // headings are ordered; we can stop once one is below threshold
        }
      }

      for (let i = 0; i < links.length; i++) {
        links[i].classList.toggle('active', i === activeIdx);
      }
    };

    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(update);
    };

    // Initial sync (after layout settles)
    requestAnimationFrame(scheduleUpdate);
    setTimeout(scheduleUpdate, 0);

    document.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
  }

  function init() {
    const state = loadState();
    disableHeadroom();
    syncScrollOffsets();
    syncSections(state);
    registerHandlers(state);
    setupTocSpy();
    sortSidebarLists();
    setupSidebarAutoHide();
    setupCalloutZoom();
    window.addEventListener('resize', () => {
      syncScrollOffsets();
    });
  }

  if (document.readyState === 'loading') {
    window.document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
