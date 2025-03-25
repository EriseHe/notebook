document.addEventListener('DOMContentLoaded', function() {
  const bookMenu = document.querySelector('.book-menu');
  
  if (!bookMenu) return; // Safety check
  
  let hideTimeout;
  const HIDE_DELAY = 8000; // Time in ms before hiding the menu (8 seconds)
  
  // Function to hide menu
  function hideMenu() {
    bookMenu.classList.add('auto-hidden');
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
    hideTimeout = setTimeout(hideMenu, HIDE_DELAY);
  }
  
  // Mouse enter event for menu
  bookMenu.addEventListener('mouseenter', showMenu);
  
  // Mouse leave event for menu
  bookMenu.addEventListener('mouseleave', setHideTimeout);
  
  // Initially set timeout to hide menu
  setHideTimeout();
}); 