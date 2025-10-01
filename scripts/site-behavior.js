(function () {
  const STORAGE_KEY = 'quarto-sidebar-state';

  function loadState() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (err) {
      console.warn('Unable to read sidebar state', err);
      return {};
    }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Unable to persist sidebar state', err);
    }
  }

  function applyState(state) {
    const collapseEls = document.querySelectorAll('#quarto-sidebar .collapse');
    collapseEls.forEach((el) => {
      const id = el.id;
      if (!id) return;
      const shouldOpen = state[id];
      const toggle = document.querySelector(`[data-bs-target="#${CSS.escape(id)}"]`);
      if (shouldOpen === undefined) return;
      if (shouldOpen) {
        el.classList.add('show');
        if (toggle) {
          toggle.classList.remove('collapsed');
          toggle.setAttribute('aria-expanded', 'true');
        }
      } else {
        el.classList.remove('show');
        if (toggle) {
          toggle.classList.add('collapsed');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  function registerStateHandlers(state) {
    const sidebar = document.querySelector('#quarto-sidebar');
    if (!sidebar) return;
    sidebar.addEventListener('shown.bs.collapse', (event) => {
      const target = event.target;
      if (target && target.id) {
        state[target.id] = true;
        saveState(state);
      }
    });
    sidebar.addEventListener('hidden.bs.collapse', (event) => {
      const target = event.target;
      if (target && target.id) {
        state[target.id] = false;
        saveState(state);
      }
    });
  }

  
  function syncActiveSections(state) {
    const sections = document.querySelectorAll('#quarto-sidebar .sidebar-item-section');
    sections.forEach(section => {
      const collapse = section.querySelector('.collapse');
      const toggle = section.querySelector('.sidebar-item-toggle');
      if (!collapse || !toggle || !collapse.id) return;

      const hasActive = collapse.querySelector('.active');
      const stored = state[collapse.id];

      if (hasActive || stored) {
        collapse.classList.add('show');
        toggle.classList.remove('collapsed');
        toggle.setAttribute('aria-expanded', 'true');
        if (hasActive) {
          state[collapse.id] = true;
        }
      } else {
        collapse.classList.remove('show');
        toggle.classList.add('collapsed');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function interceptSectionLinks() {
    const sectionLinks = document.querySelectorAll('#quarto-sidebar .sidebar-item-section .sidebar-item-text.sidebar-link');
    sectionLinks.forEach(link => {
      const section = link.closest('.sidebar-item-section');
      if (!section) return;
      const toggle = section.querySelector('.sidebar-item-toggle');
      const targetId = toggle?.getAttribute('data-bs-target');
      if (!toggle || !targetId) return;

      const collapse = document.querySelector(targetId);
      if (!collapse) return;

      link.addEventListener('click', (event) => {
        const isExpanded = collapse.classList.contains('show');
        if (!isExpanded) {
          event.preventDefault();
          toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        }
      });
    });
  }

function setupNavbarTransparency() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // At top or scrolling up: opaque
      if (currentScroll <= 50 || currentScroll < lastScroll) {
        navbar.classList.remove('navbar-transparent');
      }
      // Scrolling down: transparent
      else if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.classList.add('navbar-transparent');
      }
      
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  }

  window.document.addEventListener('DOMContentLoaded', function () {
    const state = loadState();
    
    const header = document.getElementById('quarto-header');
    if (header?.headroom?.destroy) header.headroom.destroy();
    
    setupNavbarTransparency();
    syncActiveSections(state);
    applyState(state);
    registerStateHandlers(state);
    interceptSectionLinks();
  });
})();
