document.addEventListener('DOMContentLoaded', function() {
  const bookMenu = document.querySelector('.book-menu');
  
  if (!bookMenu) return; // Safety check
  
  let hideTimeout;
  const HIDE_DELAY = 8000; // Time in ms before hiding the menu (8 seconds)
  let isMouseOverMenu = false; // Track if mouse is over menu
  let isWindowFocused = true; // Track if the window is focused
  let isMenuClicked = false; // Track if a menu item was just clicked
  
  // Calculate the menu width for detection area
  const menuWidth = bookMenu.offsetWidth;
  const detectionWidth = Math.max(menuWidth * 1.5, 250); // Width of detection area, at least 250px
  
  // Function to hide menu
  function hideMenu() {
    // Only hide if mouse is not over the menu and window is focused
    if (!isMouseOverMenu && isWindowFocused) {
      bookMenu.classList.add('auto-hidden');
    }
  }
  
  // Function to show menu
  function showMenu() {
    bookMenu.classList.remove('auto-hidden');
    
    // Clear any existing timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
  }
  
  // Set timeout to hide menu after delay
  function setHideTimeout() {
    // Only set timeout if mouse is not over the menu
    if (!isMouseOverMenu) {
      // Clear any existing timeout first to prevent multiple timers
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      hideTimeout = setTimeout(hideMenu, HIDE_DELAY);
    }
  }
  
  // Mouse enter event for menu - always show and prevent auto-hiding
  bookMenu.addEventListener('mouseenter', function() {
    isMouseOverMenu = true;
    showMenu();
  });
  
  // Mouse leave event for menu
  bookMenu.addEventListener('mouseleave', function(e) {
    // Check if we're actually leaving to a different element, not a child
    if (!e.relatedTarget || !bookMenu.contains(e.relatedTarget)) {
      isMouseOverMenu = false;
      // Small delay to make sure cursor has actually left
      setTimeout(() => {
        if (!isMouseOverMenu) {
          setHideTimeout();
        }
      }, 50);
    }
  });
  
  // Handle menu clicks to prevent toggling issues
  bookMenu.addEventListener('click', function(e) {
    // If we clicked a link in the menu
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      // Set a flag to indicate menu was clicked
      isMenuClicked = true;
      
      // Keep menu visible
      showMenu();
      
      // Reset flag after a delay
      setTimeout(() => {
        isMenuClicked = false;
        // If mouse is not over the menu, set the hide timeout
        if (!isMouseOverMenu) {
          setHideTimeout();
        }
      }, 500);
    }
  });
  
  // Fix for focus issues: track window focus/blur
  window.addEventListener('focus', function() {
    isWindowFocused = true;
  });
  
  window.addEventListener('blur', function() {
    isWindowFocused = false;
    showMenu(); // Show menu when window loses focus to avoid stuck state
  });
  
  // Add movement detection to show menu
  document.addEventListener('mousemove', function(e) {
    // If the menu is hidden and mouse is within the detection area
    if (bookMenu.classList.contains('auto-hidden') && e.clientX < detectionWidth) {
      showMenu();
      // Don't set timeout immediately to give user chance to move to menu
      setTimeout(() => {
        if (!isMouseOverMenu) {
          setHideTimeout();
        }
      }, 1000);
    }
  });
  
  // Initially set timeout to hide menu - but give user time to see menu first
  setTimeout(setHideTimeout, 2000);
}); 