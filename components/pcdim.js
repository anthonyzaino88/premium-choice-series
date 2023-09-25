class ProductDimensionsTable extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.fetchData();
    }
  
    async fetchData() {
      try {
        const response = await fetch('../Data/pcdimdata.json');
        const data = await response.json();
        this.render(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    render(data) {
      const headers = data.headers.map(header => `<th>${header}</th>`).join('');
      const rows = data.rows.map(row => `<tr class="bg-light">${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
      const colgroup = data.columnStyles.map(style => `<col style="width:${style.width || ''}">`).join('');
  
      this.shadowRoot.innerHTML = `
        <style>
        
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom : 3rem;
          }
          .table th, .table td {
            border: 1px solid #053558;
            padding: 8px;
            text-align: center;
          }
          .thead-dark th {
            background-color: whitesmoke;
            color: #053658;
          }
          .bg-light {
            background-color: whitesmoke;
            color: #053658;
          }

          .img-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 3rem;
            

        </style>

        <div class="img-wrapper"><img src="../assest/icons/pc-dim.png" alt="dimension-PC"></div>


        <div class="table-responsive">
          <table class="table table-bordered text-center">
            <colgroup>${colgroup}</colgroup>
            <thead class="thead-dark">
              <tr>${headers}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    }
  }
  
  customElements.define('product-dimensions-table', ProductDimensionsTable);
  