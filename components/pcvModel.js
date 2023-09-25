class ProductComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
        // Load external styles
  const stylesLink = document.createElement('link');
  stylesLink.setAttribute('rel', 'stylesheet');
  stylesLink.setAttribute('href', '/styles/product-page.css'); // Adjust the path as needed
  this.shadowRoot.appendChild(stylesLink);
    }
  
    connectedCallback() {
      // Get the JSON data from the script tag in the HTML page
      const productData = document.getElementById('product-data').textContent;
      const product = JSON.parse(productData);
    
      // Retrieve the model parameter from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const selectedModel = urlParams.get('model');
    
      // Render the product and set the selected model in the dropdown
      this.renderProduct(product);
    
    
    
      const modelLinks = this.shadowRoot.querySelectorAll('.model-link');
      modelLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          this.handleModelClick(event);
        });
      });



  }

    handleModelClick(event) {
      event.preventDefault(); // Prevent the default link behavior
      const selectedModel = event.target.getAttribute('data-model');
      window.location.href = `/accessories.html?model=${encodeURIComponent(selectedModel)}`;
    }

    
    
  
 
    renderProduct(product) {
      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');
  
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      const literatureSections = Object.keys(product.literature).map(partId => {
        const literatureItems = product.literature[partId].map(item => `
          <li><a href="${item.link}" target="_blank">${item.name}</a></li>
        `).join('');
      
        return `
       
        <div class="lit-container">
          <h2 style="color: #053658; border-bottom: 1px #053658 solid; letter-spacing: 2px; text-align: center; opacity: .7;">${partId}</h2>
          <ul class="literature-list">
            ${literatureItems}
          </ul>
        </div>


        `;
      }).join('');


      
    
  
      // Use template literals to dynamically populate the product data
      productElement.innerHTML = `


       
        <div class="top-wrapper">
        <div class="img-wrapper">
         <img id="model-img" src="${product.image}" alt="${product.title}">
         </div>
         <div class="left-wrapper">
         <h1>${product.title}</h1>
         <p>PCXP Series</p>
        <p id="model-disc">${product.description}</p>
        <div style="display: flex">
        <div class="warranty">
        <img src="${product.warranty}" alt="Warranty" class="warranty-image">
      </div>
      <div class="icons">
        <img src="${product.iconOne}" alt="Icon One" class="icon">
        <img src="${product.iconTwo}" alt="Icon Two" class="icon">
        <img src="${product.iconThree}" alt="Icon Three" class="icon">
        <img src="${product.iconFour}" alt="Icon Four" class="icon">
       </div>
       </div>
       </div>
       </div>
     <div class="section-wrapper">
      <div class="dropdown-container">
        <div class="section">
          <h4 class="section-title">Features</h4>
          <div class="section-content">
            <ul class="features-list">
              ${product.features.map((feature) => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="section">
        <h4 class="section-title">Certifications & Listings</h4>
        <div class="section-content">
          <ul class="features-list">
            ${product.certsList.map((certs) => `<li>${certs}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="section">
      <h4 class="section-title">Applications</h4>
      <div class="section-content">
        <ul class="features-list">
          ${product.applications.map((apps) => `<li>${apps}</li>`).join('')}
        </ul>
      </div>
    </div>
        <div class="section">
          <h4 class="section-title">Specification</h4>
          <div class="section-content"><div style="letter-spacing: 1px; color: #053658; opacity: .7; font-size: 20px; margin-bottom: 1rem;">${product.specification}</div>
          <pc-hvi-table></pc-hvi-table>
          </div>
        </div>
        <div class="section">
          <h4 class="section-title">Dimensions</h4>
          <div class="section-content"><div style="letter-spacing: 1px; color: #053658; opacity: .7; font-size: 20px; margin-bottom: 1rem; text-align: center;">${product.dimensions}</div>
          <product-dimensions-table></product-dimensions-table>
        </div>
        </div>
        <div class="section">
        <h4 class="section-title">Literature</h4>
        <div class="section-content">
      <div class="lit-wrap" style="margin-top: 10px;">
          ${literatureSections}
         </div>
         </div>
     
      <div class="section">
      <h4 class="section-title">Accessories</h4>
      <div class="section-content">
        <div style="letter-spacing: 1px; margin-bottom: 1rem; display: flex; flex-direction: column; margin-left: 1.5rem;">
        <a href="http://test.premiumchoiceseries.com/accessories.html?model=PC50XP" class="model-link">PC50XP</a>
        <a href="http://test.premiumchoiceseries.com/accessories.html?model=PC80XP" class="model-link">PC80XP</a>
     
          <!-- Add links for other PC models -->
        </div>
      </div>
    </div>
    
    
        
    
        

      `;

  
  
      productContainer.appendChild(productElement);
  
      this.shadowRoot.appendChild(productContainer);
    // Add event listeners to the section elements for dropdown functionality
    const sections = this.shadowRoot.querySelectorAll('.section');
    sections.forEach((section) => {
      section.addEventListener('click', this.toggleSection.bind(this));
    });
    const litContainers = this.shadowRoot.querySelectorAll('.lit-container');
    litContainers.forEach((litContainer) => {
      const h2 = litContainer.querySelector('h2');
      const ul = litContainer.querySelector('.literature-list');
    
      h2.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event from reaching the parent section
        ul.classList.toggle('show');
      });
    });


  }

  
  
  toggleSection(event) {
    const clickedSection = event.currentTarget; // Get the section that was clicked
    const clickedTitle = clickedSection.querySelector('.section-title');
    const clickedContent = clickedSection.querySelector('.section-content');
  
    // Iterate through all sections
    const sections = this.shadowRoot.querySelectorAll('.section');
    sections.forEach((section) => {
      const title = section.querySelector('.section-title');
      const content = section.querySelector('.section-content');
  
      // If this is the section that was clicked, toggle it
      if (section === clickedSection) {
        if (clickedContent.classList.contains('show')) {
          clickedContent.style.height = '0px';
          setTimeout(() => {
            clickedContent.classList.remove('show');
          }, 500);
        } else {
          clickedContent.classList.add('show');
          clickedContent.style.height = clickedContent.scrollHeight + 'px';
        }
        clickedTitle.classList.toggle('active');
      }
      // Otherwise, close it if it's open
      else if (content.classList.contains('show')) {
        content.style.height = '0px';
        setTimeout(() => {
          content.classList.remove('show');
        }, 500);
        title.classList.remove('active');
      }
    });
  }



  




  }
  
  customElements.define('product-component', ProductComponent);
  