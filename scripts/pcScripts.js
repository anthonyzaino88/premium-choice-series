
// Get the button element by its ID
const ctaButton = document.getElementById('cta-button-iaq');
// Set the URL you want to link to
const url = 'https://www.premiumchoiceseries.com/documents/Flyer/OAS-Flyer.pdf'; // Replace with your desired URL
// Add a click event listener to the button
ctaButton.addEventListener('click', () => {
// Open the specified URL in a new tab/window when the button is clicked
  window.open(url, '_blank');
    });


// Get the button element by its ID
const ctaButtonResponsive = document.getElementById('responsive-cta-button-iaq');

// Set the URL you want to link to
const urlTwo = 'https://www.premiumchoiceseries.com/documents/Flyer/OAS-Flyer.pdf'; // Replace with your desired URL
// Add a click event listener to the button
ctaButtonResponsive.addEventListener('click', () => {
// Open the specified URL in a new tab/window when the button is clicked
window.open(url, '_blank');
});



   
  // Get the button element
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  // Function to check if the user is close to the bottom of the page
  function isCloseToBottom() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollYFromBottom = scrollableHeight - window.scrollY;
    return scrollYFromBottom <= 800; // Change this value to adjust the threshold
  }
  
  // Function to handle the scroll event
  function handleScroll() {
    if (isCloseToBottom()) {
      // If close to the bottom, show the button
      scrollToTopBtn.classList.add('active');
    } else {
      // Otherwise, hide the button
      scrollToTopBtn.classList.remove('active');
    }
  }
  
  // Add a scroll event listener to the window
  window.addEventListener('scroll', handleScroll);
  
  // Function to handle the click event on the button
  function handleButtonClick() {
    // Scroll back to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Add a click event listener to the button
  scrollToTopBtn.addEventListener('click', handleButtonClick);


  
  // Get the current year and update the content of the "current-year" span
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;