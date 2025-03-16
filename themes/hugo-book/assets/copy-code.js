document.addEventListener("DOMContentLoaded", function() {
  const copyButtons = document.querySelectorAll(".copy-button");

  copyButtons.forEach(button => {
    // Store the original HTML (icon) so we can revert to it later
    const originalIconHTML = button.innerHTML;

    button.addEventListener("click", function() {
      // Find the corresponding <code> element in the same code block container
      const codeBlock = this.parentElement.querySelector("pre code");
      if (!codeBlock) return;

      // Use the Clipboard API to write the text content
      navigator.clipboard.writeText(codeBlock.innerText)
        .then(() => {
          // Temporarily replace the button’s contents with a “Copied!” message
          button.textContent = "Copied";
          setTimeout(() => {
            // Revert to the original icon HTML
            button.innerHTML = originalIconHTML;
          }, 1500);
        })
        .catch(err => {
          console.error("Failed to copy code:", err);
          // Temporarily show an error message
          button.textContent = "Error";
          setTimeout(() => {
            // Revert to the original icon HTML
            button.innerHTML = originalIconHTML;
          }, 1500);
        });
    });
  });
});
