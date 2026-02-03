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

  function setupToggleClicks() {
    const toggles = document.querySelectorAll('#quarto-sidebar .sidebar-item-section .sidebar-item-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', evt => {
        evt.preventDefault();
        const targetId = toggle.getAttribute('data-bs-target');
        if (!targetId) return;
        const collapse = document.querySelector(targetId);
        if (!collapse) return;

        const shouldShow = !collapse.classList.contains('show');
        collapse.classList.toggle('show', shouldShow);
        toggle.classList.toggle('collapsed', !shouldShow);
        toggle.setAttribute('aria-expanded', shouldShow ? 'true' : 'false');

        collapse.dispatchEvent(new Event(shouldShow ? 'shown.bs.collapse' : 'hidden.bs.collapse', { bubbles: true }));
      });
    });
  }

  function setupSectionLinks() {
    const links = document.querySelectorAll('#quarto-sidebar .sidebar-item-section > .sidebar-item-container > .sidebar-item-text.sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', evt => {
        const section = link.closest('.sidebar-item-section');
        if (!section) return;
        const toggle = section.querySelector('.sidebar-item-toggle');
        if (!toggle) return;
        const targetId = toggle.getAttribute('data-bs-target');
        const collapse = document.querySelector(targetId);
        if (!collapse) return;

        if (!collapse.classList.contains('show')) {
          evt.preventDefault();
          toggle.click();
        }
      });
    });
  }

  function sortSidebarLists() {
    const collator = new Intl.Collator(['zh-CN', 'en'], {
      numeric: true,
      sensitivity: 'base',
      ignorePunctuation: true,
    });

    const lists = document.querySelectorAll('#quarto-sidebar ul.sidebar-section');
    lists.forEach(list => {
      const children = Array.from(list.children);
      if (!children.length) return;
      const hasSection = children.some(child => child.classList.contains('sidebar-item-section'));
      if (hasSection) return;

      const items = children.filter(child => child.classList.contains('sidebar-item'));
      if (items.length < 2) return;

      const getText = (item) => {
        const link = item.querySelector('.sidebar-item-text');
        return link ? link.textContent.replace(/\s+/g, ' ').trim() : '';
      };

      const sorted = items.slice().sort((a, b) => {
        const aText = getText(a);
        const bText = getText(b);
        return collator.compare(aText, bText);
      });

      const changed = sorted.some((item, idx) => item !== items[idx]);
      if (!changed) return;
      sorted.forEach(item => list.appendChild(item));
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

    const clearZoom = () => {
      if (!active) return;
      const target = active;
      const dx = Number.parseFloat(target.dataset.zoomX || '0');
      const dy = Number.parseFloat(target.dataset.zoomY || '0');

      target.style.setProperty('--zoom-x', `${dx}px`);
      target.style.setProperty('--zoom-y', `${dy}px`);
      target.style.setProperty('--zoom-scale', '1');

      const cleanup = () => {
        target.classList.remove('callout-zoomed');
        target.style.removeProperty('--zoom-x');
        target.style.removeProperty('--zoom-y');
        target.style.removeProperty('--zoom-scale');
        target.style.removeProperty('--zoom-width');
        delete target.dataset.zoomX;
        delete target.dataset.zoomY;
        active = null;
        backdrop.remove();
        document.body.classList.remove('callout-zoom-active');
      };

      target.addEventListener('transitionend', cleanup, { once: true });
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(cleanup, 300);
    };

    backdrop.addEventListener('click', clearZoom);
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') clearZoom();
    });

    document.addEventListener('dblclick', (evt) => {
      const callout = evt.target.closest('.math-theorem, .callout');
      if (!callout) return;

      evt.preventDefault();
      evt.stopPropagation();

      if (active && active !== callout) clearZoom();

      if (active === callout) {
        clearZoom();
        return;
      }

      const rect = callout.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const viewportX = window.innerWidth / 2;
      const viewportY = window.innerHeight / 2;
      const dx = centerX - viewportX;
      const dy = centerY - viewportY;

      active = callout;
      active.dataset.zoomX = String(dx);
      active.dataset.zoomY = String(dy);
      active.style.setProperty('--zoom-x', `${dx}px`);
      active.style.setProperty('--zoom-y', `${dy}px`);
      active.style.setProperty('--zoom-scale', '1');
      active.style.setProperty('--zoom-width', `${rect.width}px`);

      active.classList.add('callout-zoomed');
      document.body.classList.add('callout-zoom-active');
      document.body.appendChild(backdrop);

      requestAnimationFrame(() => {
        if (!active) return;
        active.style.setProperty('--zoom-x', '0px');
        active.style.setProperty('--zoom-y', '0px');
        active.style.setProperty('--zoom-scale', '1.5');
      });
    }, true);

    document.addEventListener('click', (evt) => {
      if (active && !active.contains(evt.target)) clearZoom();
    });
  }

  function init() {
    const state = loadState();
    disableHeadroom();
    syncSections(state);
    registerHandlers(state);
    setupToggleClicks();
    setupSectionLinks();
    sortSidebarLists();
    setupSidebarAutoHide();
    setupCalloutZoom();
  }

  if (document.readyState === 'loading') {
    window.document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
