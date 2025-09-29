// Initialize function to reinitialize scripts after content update
function initializeComponents() {
  // IMPORTANT: process theorem blocks BEFORE MathJax typesets to avoid
  // MathJax altering text nodes and confusing our extraction
  if (typeof window.processTheoremBlocks === 'function') {
    try { window.processTheoremBlocks(); } catch (e) { console.error(e); }
  }
  // Now typeset math
  if (window.MathJax) {
    window.MathJax.typeset();
  }
  
  // Reinitialize copy code buttons
  const codeBlocks = document.querySelectorAll('.book-page pre > code');
  if (codeBlocks.length) {
    codeBlocks.forEach(codeBlock => {
      // Check if it already has a copy button
      if (!codeBlock.parentNode.querySelector('.copy-code-button')) {
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.innerText = 'Copy';
        button.addEventListener('click', () => {
          // Copy code logic
          navigator.clipboard.writeText(codeBlock.textContent);
          button.innerText = 'Copied!';
          setTimeout(() => {
            button.innerText = 'Copy';
          }, 2000);
        });
        codeBlock.parentNode.insertBefore(button, codeBlock);
      }
    });
  }
  
  // Reinitialize TOC toggle if it exists
  const tocToggle = document.getElementById('toc-control');
  if (tocToggle) {
    const tocEntries = document.querySelector('.toc-entries');
    if (tocEntries && tocEntries.offsetHeight) {
      document.getElementById('book-toc').classList.remove('hidden');
    } else {
      document.getElementById('book-toc').classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Only apply this for non-mobile views
  const menuLinks = document.querySelectorAll('.book-menu a');
  const bookMenu = document.querySelector('.book-menu');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't intercept external links or hash links
      if (
        this.hostname !== window.location.hostname || 
        this.getAttribute('href').startsWith('#') ||
        this.getAttribute('target') === '_blank'
      ) {
        return;
      }
      
      e.preventDefault();
      
      // Ensure menu stays visible during page load
      if (bookMenu) {
        bookMenu.classList.remove('auto-hidden');
      }
      
      const url = this.href;
      
      // Show loading indicator
      document.body.classList.add('loading');
      
      // Update URL without page refresh
      window.history.pushState({url: url}, '', url);
      
      // Fetch the page content
      fetch(url)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // Update the page content
          const pageContent = doc.querySelector('.book-page');
          if (pageContent) {
            document.querySelector('.book-page').innerHTML = pageContent.innerHTML;
          }
          
          // Update the TOC content
          const tocContent = doc.querySelector('.book-toc-content');
          if (tocContent && document.querySelector('.book-toc-content')) {
            document.querySelector('.book-toc-content').innerHTML = tocContent.innerHTML;
          }
          
          // Update the document title
          document.title = doc.title;
          
          // Highlight the current menu item
          menuLinks.forEach(menuLink => {
            menuLink.classList.remove('active');
          });
          this.classList.add('active');
          
          // Reinitialize scripts for the new content
          initializeComponents();
          
          // Remove loading indicator
          document.body.classList.remove('loading');
          
          // Let the auto-hide system take over after a short delay
          setTimeout(() => {
            if (bookMenu) {
              if (bookMenu.matches(':hover')) {
                // If mouse is over menu, keep it visible
                bookMenu.dispatchEvent(new Event('mouseenter'));
              } else {
                // If mouse is not over menu, let it auto-hide
                bookMenu.dispatchEvent(new Event('mouseleave'));
              }
            }
          }, 500);
        })
        .catch(error => {
          console.error('Error loading page:', error);
          // Fallback to normal navigation on error
          window.location.href = url;
        });
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.url) {
      location.reload();
    }
  });
}); 