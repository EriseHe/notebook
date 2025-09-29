document.addEventListener('DOMContentLoaded', function() {
  const toolbar = document.querySelector('.toolbar');
  const trigger = document.querySelector('.toolbar-trigger');
  
  if (!toolbar || !trigger) return; // Safety check

  // Show toolbar when hovering over trigger
  trigger.addEventListener('mouseenter', function() {
    toolbar.classList.add('visible');
  });

  // Keep toolbar visible when hovering over it
  toolbar.addEventListener('mouseenter', function() {
    toolbar.classList.add('visible');
  });

  // Hide toolbar when mouse is not near the toolbar or trigger
  document.addEventListener('mousemove', function(e) {
    if (!isNearToolbar(e, toolbar, trigger, 100)) {
      toolbar.classList.remove('visible');
    } else {
      toolbar.classList.add('visible');
    }
  });

  // Helper function to check if mouse is near an element
  function isNearToolbar(e, toolbar, trigger, threshold) {
    const toolbarRect = toolbar.getBoundingClientRect();
    
    // Check if mouse is near the toolbar
    const nearToolbar = 
      e.clientX >= toolbarRect.left - threshold &&
      e.clientX <= toolbarRect.right + threshold &&
      e.clientY >= toolbarRect.top - threshold &&
      e.clientY <= toolbarRect.bottom + threshold;
    
    // Check if mouse is near the right edge of the screen
    const nearRightEdge = e.clientX >= window.innerWidth - 150; // 150px from right edge
    
    return nearToolbar || nearRightEdge;
  }
}); 