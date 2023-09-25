


class AccessoriesGrid extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Fetch the accessories data
    fetch('./Data/accessoriesData.json')
      .then(response => response.json())
      .then(data => {
        this.accessoriesData = data.accessories;
        this.renderAccessories(this.accessoriesData);
      })
      .catch(error => console.error('Error fetching accessories data:', error));
  }

  renderAccessories(accessories) {
    const container = document.createElement('div');
    container.classList.add('accessories-container');

    const dropdown = document.createElement('select');
    dropdown.classList.add('product-dropdown');

    const uniqueProducts = Array.from(new Set(accessories.flatMap(accessory => accessory.ParentProduct)));

    // Add an option for re-rendering all accessories
    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All Accessories';
    dropdown.appendChild(allOption);

    // Loop through the unique parent products
    for (const product of uniqueProducts) {
      const option = document.createElement('option');
      option.value = product;
      option.textContent = product;
      dropdown.appendChild(option);
    }

    // Add event listener to the dropdown for handling selection change
    dropdown.addEventListener('change', this.handleProductSelection.bind(this));

    container.appendChild(dropdown);

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('accessories-grid');

    // Loop through the accessories and create a grid item card for each
    accessories.forEach(accessory => {
      const card = `


      <style>

      .accessories-container {
        padding: 30px;
      }
      
      .product-dropdown {

       
        font-size: 18px;
        border-radius: 8px;
       
      }


      option {
        font-size: 18px;
        color:rgba(0,0,0,.5);
      }

      option:hover {
        background-color: white!important;
      }

      select {
         font-size: 20px!important;
         color: #053658;
         background: whitesmoke!important;
         box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;!important;
      }
      
      .accessories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
        margin-left: 15rem;
        margin-right: 15rem;
        justify-content: center;
      }



      
      
      .accessory-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        background-color: #ffffff;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        transition: 0.3s ease-in-out;
        opacity: 1;
        border-radius: 10px;
        max-width: 100%;
   
      }
      
      .accessory-card:hover {
        transform: translateY(-5px);
      }
      
      .accessory-card img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        
      }
      
      .part-id {
        font-weight: bold;
        margin-bottom: 5px;
        color: rgba(0,0,0,.8);
      }
      
      .description {
        margin-bottom: 12px;
        color: rgba(0,0,0,.5);
        display: flex;
        font-size: 13px;
        
      }
      
      button {
        padding: 8px 25px;
        background-color: #f8f8f8;
        border-radius: 5px;
        border: none;
        color: #053658;
        font-weight: bold;
        cursor: pointer;
        opacity: 1;
        transition: background-color 0.3s ease-in-out;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        margin-top: 12px;
        font-size: 15px;
        letter-spacing: .5px;
        font-weight: 600;
    
      }
      
      button:hover {
        background-color: #053658;
        opacity: 1;
        color: white;
      }

            
      @media screen and (max-width: 1268px) {
        .accessories-grid {
          margin-left: 2rem;
          margin-right: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
         
        }

        


        
        .product-dropdown {

          box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
          font-size: 18px;
          border-radius: 8px;
          float: none;
          margin-bottom: 30px;
          margin-left: 2rem;
          border: none;
        }
        


      }
      
      @media screen and (max-width: 480px) {
        .accessories-grid {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
       
        }

        .description {
          margin-bottom: 15px;
          color: rgba(0,0,0,.5);
          display: none;
          
        }

        button {
          padding: 4px 10px;
          background-color: #f8f8f8;
          border-radius: 5px;
          border: none;
          color: rgba(0,0,0,.5);
          font-weight: bold;
          cursor: pointer;
          opacity: 1;
          transition: background-color 0.3s ease-in-out;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          margin-top: 20px;
          font-size: 15px;
          letter-spacing: 1px;
          font-weight: 600;
      
        }


      }
      
      </style>


      
        <div class="accessory-card" data-parent-products='${JSON.stringify(accessory.ParentProduct)}'>
          <img src="${accessory.image}" alt="${accessory.description}">
          <div class="part-id">${accessory.partID}</div>
          <div class="description">${accessory.description}</div>
          ${accessory.submittal ? `<button data-submittal="${accessory.submittal}">Submittal</button>` : ''}
        </div>
      `;

      gridContainer.innerHTML += card;
    });

    container.appendChild(gridContainer);

    // Append the container to the shadow DOM
    this.shadowRoot.appendChild(container);
  }
  handleProductSelection(event) {
    const selectedProduct = event.target.value;
    const accessoryCards = Array.from(this.shadowRoot.querySelectorAll('.accessory-card'));

    accessoryCards.forEach(card => {
      const parentProducts = JSON.parse(card.getAttribute('data-parent-products'));
      if (selectedProduct === '' || parentProducts.includes(selectedProduct)) {
        card.style.opacity = 0;
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = 1;
        }, 100);
      } else {
        card.style.opacity = 0;
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  connectedCallback() {
    // Add event listener to the grid container for handling submittal button clicks
    this.shadowRoot.addEventListener('click', this.handleSubmittalClick.bind(this));
  }

  handleSubmittalClick(event) {
    const submittalBtn = event.target;
    if (submittalBtn.tagName === 'BUTTON') {
      const submittalUrl = submittalBtn.getAttribute('data-submittal');
      window.open(submittalUrl, '_blank');
    }
  }
}

// Define the custom element tag
customElements.define('accessories-grid', AccessoriesGrid);
