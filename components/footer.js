class Footer extends HTMLElement {
    constructor() {
        super();
      }

      connectedCallback(){
this.innerHTML = `



<style>

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.link-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-list li {
  margin-right: 20px;
}

.link-list li:last-child {
  margin-right: 0;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  margin-bottom: 5px;
}

.dropdown-menu a {
  text-decoration: none;
  color: #333;
}

.logo {
  width: 200px;
  height: auto;

}

.text-center {
  text-align: center ;
}


</style>




<footer>
  <div class="footer-container">
    <ul class="link-list">
      <li><a href="/default.html#products-featured" class="dropdown-toggle">Models</a></li>
      <li><a href="/cookies.html">Cookies</a></li>
      <li><a href="/sitemap.html">Website Map</a></li>
    </ul>

    <p class="legal" style="color: white;">&copy; <span id="current-year"></span> Premium CHOICE Series by S&amp;P. All rights reserved.</p>

    <p class="text-center"><a href="https://www.solerpalau.com/en-en/international-distribution" rel="noopener" target="_blank">
        <img class="logo" src="https://www.premiumchoiceseries.com/images/logo/spvg-logo.svg" alt="Soler &amp; Palau Ventilation Group"></a></p>
  </div>
</footer>

`;


  

      }
    }


    customElements.define('footer-component', Footer); 