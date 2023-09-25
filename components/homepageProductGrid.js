class HomepageProductGrid extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.products = [];
    }
  
    connectedCallback() {
      this.fetchProductData();
      this.loadStyles();
    }

    loadStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './styles/homepageProductGrid.css'; // Replace with the actual path to your CSS file
        this.shadowRoot.appendChild(link);
      }
  
    fetchProductData() {
      fetch('./Data/productGridData.json')
        .then(response => response.json())
        .then(data => {
          this.products = data;
          this.renderGrid();
          this.observeIntersection();
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    }
    renderGrid() {
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('product-grid');

        const gridWrapper = document.createElement('div');
        gridWrapper.classList.add('grid-wrapper');

        const headerTitle = document.createElement('h1');
        headerTitle.classList.add("model-title");
        headerTitle.textContent = 'PC - Models';
        gridContainer.appendChild(headerTitle);
      
        this.products.forEach(product => {
          const gridItem = document.createElement('div');
          gridItem.classList.add('grid-item');

          
      
          const wrapperElement = document.createElement('div');
          wrapperElement.classList.add('title-description-wrapper');
      
          const titleElement = document.createElement('h2');
          titleElement.textContent = product.title;
      
          const descriptionElement = document.createElement('ul');
          descriptionElement.classList.add('description');
      
          const descriptions = [
            product.descriptionOne,
            product.descriptionTwo,
            product.descriptionThree,
            product.descriptionFour,
            product.descriptionFive,
            
          ];
      
          descriptions.forEach(description => {
            if (description) {
              const descriptionItem = document.createElement('li');
              descriptionItem.textContent = description;
              descriptionElement.appendChild(descriptionItem);
            }
          });
      
          wrapperElement.appendChild(titleElement);
          wrapperElement.appendChild(descriptionElement);
      
          const imageElement = document.createElement('img');
          imageElement.src = product.image;
          imageElement.alt = product.title;
      
          const ctaButton = document.createElement('a');
          ctaButton.classList.add('cta-button');
          ctaButton.href = product.link;
          ctaButton.textContent = 'Learn More';
      
          wrapperElement.appendChild(ctaButton);
      
          gridItem.appendChild(wrapperElement);
          gridItem.appendChild(imageElement);

          gridWrapper.appendChild(gridItem);
      
          
        });
        gridContainer.appendChild(gridWrapper);
        this.shadowRoot.appendChild(gridContainer);
      }
      
      
  
  }
  
  customElements.define('homepage-product-grid', HomepageProductGrid);
  