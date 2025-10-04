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

  window.document.addEventListener('DOMContentLoaded', () => {
    const state = loadState();
    disableHeadroom();
    syncSections(state);
    registerHandlers(state);
    setupToggleClicks();
    setupSectionLinks();
    setupSidebarAutoHide();
  });
})();
