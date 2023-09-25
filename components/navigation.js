// Define the custom element
class ResponsiveNavigation extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create the HTML structure
    const template = document.createElement('template');
    template.innerHTML = `
   


      <header>
      <nav class="navbar">
        <div class="navbar-brand">
          <img src="https://www.premiumchoiceseries.com/images/logo/pc-logo.svg" alt="Brand Logo" class="logo" id="brand-logo">
        </div>
        <ul class="navbar-links">
          <li><a href="./default.html">Home</a></li>
          <li><a href="https://www.premiumchoiceseries.com/models/pc.html">AC Motor Models</a></li>
          <li><a href="https://www.premiumchoiceseries.com/models/pcv.html">Value Series Models</a></li>
          <li><a href="https://www.premiumchoiceseries.com/models/pcd.html">DC Motor Models</a></li>
          <li><a href="https://www.premiumchoiceseries.com/models/pclp.html">Low Profile Models</a></li>
          <li><a href="./accessories.html">Accessories</a></li>
          <div class="navbar-right-mobile">
          <img src="../assest/icons/search.svg" alt="search-Icon" style="padding-right: 5px;">
          <input type="text" placeholder="Search" class="search-input">
          <a href="#usa">USA</a>
          <a href="#canada">Canada</a>
        </div>
     
        </ul>
        <button class="svg-icon-button">
        <img src="../assest/icons/barz.svg" alt="Icon">
      </button>
       
        <div class="navbar-right">
          <input type="text" placeholder="Search" class="search-input">
          <a href="#usa">USA</a>
          <a href="#canada">Canada</a>
        </div>
      </nav>
    </header>
    
    

    `;

    // Append the template to the shadow DOM
    shadow.appendChild(template.content.cloneNode(true));

    // Create a <style> element for the styles
    const style = document.createElement('style');
    style.textContent = `
    body {

      margin: 0;
      padding: 0;
    }
    
  header {
  
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: white;
      z-index: 999;
      font-weight: 500;
      opacity: .9;
      
    }
    
  .navbar {
  
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px;
      font-size: 20px;
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      height: 90px;
      
  
    }
  
  
    
  .navbar-brand {
  
      display: flex;
      align-items: center;
    
    }
  
    
  .logo {
  
      height: 45px;
      width: auto;
      transition: transform 0.3s;
      padding: 20px;
      margin-left: 2px;
    
    }
  
    
    .navbar-links {
  
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
  
    }
    
    .navbar-links li {
  
      margin-right: 20px;
  
    }
    
    .navbar-links li a {
  
      text-decoration: none;
      color: #053658;
  
  
    }
  
    .navbar-links li a:hover {
      text-decoration: none;
      
      border-bottom: solid 2px #053658;
   
    }
    
    .navbar-right {
      display: flex;
      align-items: center;
  
    }
  
    
    .navbar-right a {
      text-decoration: none;
      color: rgba(0,0,0,.5);
      display: flex;
      padding: 3px;
    }
  
  
    .navbar-right a:hover {
      text-decoration: none;
      color: #053658;
      display: flex;
      padding: 3px;
    }
  
  
    
    
    .search-input {
      margin-right: 20px;
    }
  
    .svg-icon-button {
      display: none;
      background-color: transparent;
      border: none;
      z-index: 9999;
    }
  
    .navbar-right-mobile {
      display: none;
    }
  
  
  /* Media queries */
  
  @media screen and (max-width: 1355px) {
    .navbar {
      font-size: 18px;
    }
  
  
  
  
  .navbar-links {
  display: none;
  }
  
  .navbar-right {
  display: none;
  }
  .svg-icon-button {
  display: flex;
  
  }
  
  .logo {
  height: 40px;
  width: auto;
  transition: transform 0.3s;
  padding: 10px;
  margin-left: 5px;
  }
  
  .mobile-nav .navbar-right-mobile {
  display: flex;
  
  }
  
  .mobile-nav .navbar-right-mobile a {
  text-decoration: none;
  color: black;
  display: flex;
  padding: 3px;
  
  }
  .navbar-links.mobile-nav {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  gap: 2rem;
  top: 10px;
  width: 100%;
  height: 520px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  
  .navbar-links.mobile-nav.visible {
  transform: translateX(0);
  opacity: 1;
  }
  
  .navbar-links.mobile-nav li {
  margin-bottom: 10px;
  }
  
  
  
  
  }
    
  
    `;

    // Append the style element to the shadow DOM
    shadow.appendChild(style);
  }

  connectedCallback() {
    // Add scroll event listener to the window
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // Add event listener to the toggle button
    const toggler = this.shadowRoot.querySelector('.svg-icon-button');
    toggler.addEventListener('click', this.handleToggleClick.bind(this));
  }

  handleScroll() {
    const logo = this.shadowRoot.querySelector('.logo');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
      logo.style.transform = 'scale(1.1)';
    } else {
      logo.style.transform = 'scale(1)';
    }
  }

  handleToggleClick() {
    const navbarLinks = this.shadowRoot.querySelector('.navbar-links');
    const toggler = this.shadowRoot.querySelector('.svg-icon-button');
    const icon = toggler.querySelector('img');

    const currentIcon = icon.src.includes('barz.svg') ? 'x.svg' : 'barz.svg';
    icon.src = `./assest/icons/${currentIcon}`;

    if (currentIcon === 'x.svg') {
      navbarLinks.classList.add('mobile-nav', 'visible');
    } else {
      navbarLinks.classList.remove('visible');
      setTimeout(() => {
        navbarLinks.classList.remove('mobile-nav');
      }, 300);
    }
  }
}

// Define the custom element tag
customElements.define('responsive-navigation', ResponsiveNavigation);