document.addEventListener('DOMContentLoaded', function() {
  // Font size control for body content only
  var defaultFontSize = 17; // Increased from 16 to 17 for larger default text
  var currentSize = parseInt(localStorage.getItem('bodyFontSize')) || defaultFontSize;
  
  // Set initial font size from localStorage
  setFontSize(currentSize);
  
  // Font size buttons
  document.getElementById('font-decrease').addEventListener('click', function() {
    if (currentSize > 12) { // Minimum size
      setFontSize(currentSize - 1);
    }
  });
  
  document.getElementById('font-reset').addEventListener('click', function() {
    setFontSize(defaultFontSize);
  });
  
  document.getElementById('font-increase').addEventListener('click', function() {
    if (currentSize < 24) { // Maximum size
      setFontSize(currentSize + 1);
    }
  });
  
  // Improved hover detection
  const fontSizeControl = document.querySelector('.font-size-control');
  const fontSizeButtons = document.querySelector('.font-size-buttons');
  let hideTimeout;
  
  // When hovering over the control
  fontSizeControl.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
    fontSizeControl.classList.add('hovering');
  });
  
  // When leaving the control
  fontSizeControl.addEventListener('mouseleave', function(e) {
    // Calculate if the mouse is moving toward the dropdown
    const rect = fontSizeButtons.getBoundingClientRect();
    const movingDown = e.clientY > e.target.getBoundingClientRect().bottom;
    const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
    
    // If moving toward the dropdown, delay hiding
    if (movingDown && withinX) {
      // Don't remove the class immediately
      hideTimeout = setTimeout(() => {
        fontSizeControl.classList.remove('hovering');
      }, 1500); // 1.5 second delay
    } else {
      // Normal delay for other directions
      hideTimeout = setTimeout(() => {
        fontSizeControl.classList.remove('hovering');
      }, 300); // 0.3 second delay
    }
  });
  
  // When hovering over the dropdown
  fontSizeButtons.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
    fontSizeControl.classList.add('hovering');
  });
  
  // When leaving the dropdown
  fontSizeButtons.addEventListener('mouseleave', function() {
    hideTimeout = setTimeout(() => {
      fontSizeControl.classList.remove('hovering');
    }, 300); // 0.3 second delay
  });
  
  function setFontSize(size) {
    currentSize = size;
    
    // Only target content elements for font size changes
    document.querySelectorAll('.markdown, .posts').forEach(function(element) {
      element.style.fontSize = size + 'px';
    });
    
    localStorage.setItem('bodyFontSize', size);
  }
}); 