document.addEventListener('DOMContentLoaded', function() {
  const tocAside = document.getElementById('book-toc');
  const tocToggle = document.getElementById('toc-toggle');
  const bookLayout = document.querySelector('.book-layout');
  
  if (!tocAside || !tocToggle || !bookLayout) return; // Safety check
  
  // Set initial state
  if (tocAside.classList.contains('hidden')) {
    bookLayout.classList.add('toc-hidden');
  }
  
  // Remove any existing click handlers (just to be safe)
  const newTocToggle = tocToggle.cloneNode(true);
  tocToggle.parentNode.replaceChild(newTocToggle, tocToggle);
  
  // Add our animated toggle handler
  newTocToggle.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Toggle the hidden class which will trigger the CSS animations
    tocAside.classList.toggle('hidden');
    
    // Toggle the toc-hidden class on the book-layout
    bookLayout.classList.toggle('toc-hidden');
    
    // Force a browser reflow to ensure animation works
    void tocAside.offsetWidth;
  });
});
