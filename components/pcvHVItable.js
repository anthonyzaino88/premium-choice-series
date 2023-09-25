class ProductTable extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.fetchData();
    }
  
    async fetchData() {
      try {
        const response = await fetch('../Data/pcvhvidata.json');
        const data = await response.json();
        this.render(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    render(data) {
      const headers = data.headers.map(header => `<th${header.rowspan ? ` rowspan="${header.rowspan}"` : ''}${header.colspan ? ` colspan="${header.colspan}"` : ''}>${header.label}</th>`).join('');
      const subHeaders = data.subHeaders.map(header => `<th>${header}</th>`).join('');
      const rows = data.rows.map(row => {
        return `<tr class="bg-light">${row.map(cell => {
          if (cell === null) return '';
          if (typeof cell === 'object') {
            return `<td${cell.rowspan ? ` rowspan="${cell.rowspan}"` : ''}>${cell.label}</td>`;
          }
          return `<td>${cell}</td>`;
        }).join('')}</tr>`;
      }).join('');
    
      this.shadowRoot.innerHTML = `
        <style>

        .table-container {
          
          overflow: hidden;
        
          margin-bottom: 3rem;
         
      
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
          overflow: scroll;
        
        }
        .table th, .table td {
          border: 1px solid  #053558;
          padding: 8px;
          text-align: center;
        }
        .thead-dark th {
          color: #053658;
          background-color: whitesmoke;
        }
        .bg-light {
          background-color: whitesmoke;
          color: #053658;
        }
        </style>
        <div class="table-container">
        <table class="table table-sm table-bordered text-center">
          <thead class="thead-dark">
            <tr>${headers}</tr>
            <tr>${subHeaders}</tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        </div>
      `;
    }
    
    
  }
  
  customElements.define('pcv-hvi-table', ProductTable);
  