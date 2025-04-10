document.addEventListener('DOMContentLoaded', function() {
  // Find all toggle checkboxes in the menu
  const toggles = document.querySelectorAll('.book-menu input.toggle');
  
  // Add click event listeners to each toggle
  toggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      // If the toggle is being unchecked (closed)
      if (!this.checked) {
        // Find all child toggles that are currently checked
        const childContainer = this.nextElementSibling.nextElementSibling; // Gets the <ul> after the label
        if (childContainer) {
          const childToggles = childContainer.querySelectorAll('input.toggle:checked');
          
          // Uncheck all child toggles
          childToggles.forEach(childToggle => {
            childToggle.checked = false;
          });
        }
      }
    });
  });
  
  // Handle brand link click to ensure consistent home page navigation
  const brandLink = document.querySelector('.book-brand a');
  if (brandLink) {
    brandLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Get the base URL from the link
      const baseUrl = this.getAttribute('href');
      // Navigate to the exact home page URL, ensuring consistent parameters
      window.location.href = baseUrl;
    });
  }
}); 