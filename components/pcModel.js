class ProductComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // Get the JSON data from the script tag in the HTML page
      const productData = document.getElementById('product-data').textContent;
      const product = JSON.parse(productData);
      this.renderProduct(product);
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
          <h5>${partId}</h5>
          <ul class="literature-list">
            ${literatureItems}
          </ul>
     </div>
        `;
      }).join('');
      
    
  
      // Use template literals to dynamically populate the product data
      productElement.innerHTML = `
        <style>

        .section-title::after {
          content: '+';
          display: inline-block;
          margin-left: 8px;
          font-size: 30px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
          float: right;
        }
        
        .section-title.active::after {
          content: '-';
          color: #009BE1;
        }
        
        .section-title.active {
          color: #009BE1;
        }
        
        .section-content {
          opacity: 0;
          height: 0; /* Set initial height to 0 */
          overflow: hidden;
          transition: opacity 0.5s ease-in-out, height 0.5s ease-in-out; /* Transition for both opacity and height */
        }
        
        .section-content.show {
          opacity: 1; /* Final opacity set to 1 */
          /* Height will be set dynamically in JavaScript */
        }
        
        .literature-list ul {
          list-style-type: none;
          margin: 0rem;
          

        }
        
    .lit-wrap {
      display: flex;
    }

    .lit-container {
      flex-direction: column;
      display: flex;
      padding: 1rem;
    }

        .product-container {
       
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
        }
        
        .top-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          margin-bottom: 20px;
          margin-left: 15px;
          margin-right: 15px;
          max-height: 800px;
          max-width: 1200px;
          
        }

  .top-wrapper #model-img {
    width: 450px;
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
    
  }

  .top-wrapper p {
    max-width: 500px;
    margin-top: 20px;
    font-size: 20px;
    opacity : .7;
  }

  .warranty-image {
    width: 150px;
    margin: 0 auto;
    display: block;
  }

  .icons {
    display: flex;
    justify-content: center;
    max-width: 500px;
    margin: 20px 0;
    align-items: center;
  }

  .icon {
    
    width: 60px;
    margin: 0 8px;
    height: 60px;
  }

  .section {
    margin-bottom: 1rem;
    border-bottom: 1px solid #053658;
   
  }

  .section-title {
    cursor: pointer;
    font-size: 25px;
    color: #053658;
    letter-spacing: 1px;
    opacity: .8;
    font-weight: 400;
  }

  .section-content {
    margin: 10px 0;
  }

 

  .features-list {
    list-style: disc;
    margin-left: 1.5rem;
    font-size: 18px;
    letter-spacing: 1px;
    color: #053658;
    opacity: .7;
  }


  .link-container {
    max-width: 100%;
  }

  .breadcrumb {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    letter-spacing: 1px;
    color: #053658;
    font-weight: 600;
    font-size: 20px;
  }

  .link-container a {
    color: #053658;
    text-decoration: none;
    font-weight: 500;

  }

  .section-wrapper {
    max-width: 1200px;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
  }

  .dropdown-container {
    justify-content: end;
  }

  .left-wrapper h1 {
    color: #053658;
    opacity: .9;
  }

  .left-wrapper p {
    color: #0094D2;
  }

  .left-wrapper #model-disc {
    color: #053658;
  }

</style>


       
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
        <img src="${product.iconFive}" alt="Icon Five" class="icon">
        <img src="${product.iconSix}" alt="Icon Six" class="icon">
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
        <div class="lit-wrap">
       ${literatureSections}
      </div>
        </div>
      </div>
        <div class="acc-section">
        <h1 style="letter-spacing: 1px; color: #053658; opacity: .7; font-size: 40px; margin-bottom: 3rem; margin-top: 3rem;" >Plug -&- Play Modules + Grilles</h1>
        <div class="acc-container">
       
        <div>img here<div>


        </div>
        </div>

        <div class="video-section"></div>


      `;
  
      productContainer.appendChild(productElement);
  
      this.shadowRoot.appendChild(productContainer);
    // Add event listeners to the section elements for dropdown functionality
    const sections = this.shadowRoot.querySelectorAll('.section');
    sections.forEach((section) => {
      section.addEventListener('click', this.toggleSection.bind(this));
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
  