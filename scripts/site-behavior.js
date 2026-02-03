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
    let placeholder = null;
    let resetTimeout = null;

    const createPlaceholder = (target, rect) => {
      const ph = document.createElement('div');
      ph.className = 'callout-zoom-placeholder';
      const style = window.getComputedStyle(target);
      ph.style.height = `${rect.height}px`;
      ph.style.marginTop = style.marginTop;
      ph.style.marginBottom = style.marginBottom;
      ph.style.marginLeft = style.marginLeft;
      ph.style.marginRight = style.marginRight;
      target.parentNode?.insertBefore(ph, target);
      return ph;
    };

    const clearZoom = () => {
      if (!active) return;
      const target = active;
      const rect = target.getBoundingClientRect();
      const origin = target.dataset.zoomOrigin ? JSON.parse(target.dataset.zoomOrigin) : null;
      if (origin) {
        target.style.top = `${origin.top}px`;
        target.style.left = `${origin.left}px`;
        target.style.width = `${origin.width}px`;
        target.style.height = `${origin.height}px`;
        target.style.transform = 'translate(0, 0) scale(1)';
      } else {
        target.style.top = `${rect.top}px`;
        target.style.left = `${rect.left}px`;
        target.style.width = `${rect.width}px`;
        target.style.height = `${rect.height}px`;
        target.style.transform = 'translate(0, 0) scale(1)';
      }

      const cleanup = () => {
        target.classList.remove('callout-zoomed');
        target.style.removeProperty('top');
        target.style.removeProperty('left');
        target.style.removeProperty('width');
        target.style.removeProperty('height');
        target.style.removeProperty('transform');
        delete target.dataset.zoomOrigin;
        active = null;
        if (placeholder) {
          placeholder.remove();
          placeholder = null;
        }
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
      active = callout;
      active.dataset.zoomOrigin = JSON.stringify({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      placeholder = createPlaceholder(active, rect);
      active.style.top = `${rect.top}px`;
      active.style.left = `${rect.left}px`;
      active.style.width = `${rect.width}px`;
      active.style.height = `${rect.height}px`;
      active.style.transform = 'translate(0, 0) scale(1)';

      active.classList.add('callout-zoomed');
      document.body.classList.add('callout-zoom-active');
      document.body.appendChild(backdrop);

      requestAnimationFrame(() => {
        if (!active) return;
        active.style.top = '50%';
        active.style.left = '50%';
        active.style.transform = 'translate(-50%, -50%) scale(1.5)';
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
