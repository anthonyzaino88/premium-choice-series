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
          <li><a href="./models/pc.html">AC Motor Models</a></li>
          <li><a href="./models/pcv.html">Value Series Models</a></li>
          <li><a href="./models/pcd.html">DC Motor Models</a></li>
          <li><a href="./models/pclp.html">Low Profile Models</a></li>
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

   // Append the template to the shadow DOM
    shadow.appendChild(template.content.cloneNode(true));

    // Create a <style> element for the styles (you can keep this)
    const stylesLink = document.createElement("link");
    stylesLink.setAttribute("rel", "stylesheet");
    stylesLink.setAttribute("href", "../styles/nav.css"); // Adjust the path as needed
    this.shadowRoot.appendChild(stylesLink);

    this.jsonData = [];
  }

  connectedCallback() {
    // Add scroll event listener to the window
    window.addEventListener("scroll", this.handleScroll.bind(this));
    // Add event listener to the toggle button
    const toggler = this.shadowRoot.querySelector(".svg-icon-button");
    toggler.addEventListener("click", this.handleToggleClick.bind(this));

    const searchInputs = this.shadowRoot.querySelectorAll(".search-input");

    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener("input", this.handleSearchInput.bind(this));
    });

    const lastSearchInput = searchInputs[searchInputs.length - 1];
    lastSearchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const searchQuery = lastSearchInput.value;
        this.loadAndFilterJSON(searchQuery);
      }
    });

    const previewContainers =
      this.shadowRoot.querySelectorAll(".preview-container");

    searchInputs.forEach((searchInput, index) => {
      searchInput.addEventListener("input", (event) => {
        const searchQuery = event.target.value;
        this.updatePreview(searchQuery, previewContainers[index]);
      });
    });

    this.loadJSONData();
  }

  loadJSONData() {
    const jsonFilePath = "./Data/homepage/productGridData.json";

    // Fetch JSON data
    fetch(jsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("JSON data fetched successfully:", data);

        // Set jsonData to the fetched data
        this.jsonData = data;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  handleScroll() {
    const logo = this.shadowRoot.querySelector(".logo");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
      logo.style.transform = "scale(1.1)";
    } else {
      logo.style.transform = "scale(1)";
    }
  }

  handleToggleClick() {
    const navbarLinks = this.shadowRoot.querySelector(".navbar-links");
    const toggler = this.shadowRoot.querySelector(".svg-icon-button");
    const icon = toggler.querySelector("img");

    const currentIcon = icon.src.includes("barz.svg") ? "x.svg" : "barz.svg";
    icon.src = `./asset/icons/${currentIcon}`;

    if (currentIcon === "x.svg") {
      navbarLinks.classList.add("mobile-nav", "visible");
    } else {
      navbarLinks.classList.remove("visible");
      setTimeout(() => {
        navbarLinks.classList.remove("mobile-nav");
      }, 300);
    }
  }

  handleSearchInput(event) {
    console.log("Input event fired");
    console.log("Event target:", event.target);
    if (event.target.classList.contains("search-input")) {
      console.log("Input field detected");
    }
  }

  loadAndFilterJSON(searchQuery) {
    const jsonFilePath =
      "./Data/homepage/productGridData.json";

    console.log("Fetching JSON data...");
    fetch(jsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("JSON data fetched successfully:", data);

        const filteredData = data.filter((item) => {
          return item.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

        console.log("Filtered data:", filteredData);

        this.renderFilteredResults(filteredData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  renderFilteredResults(results) {
    if (results.length === 0) {
      alert("No model found");
      return;
    }

    const firstResult = results[0]; // Get the first result

    if (firstResult) {
      const link = firstResult.link; // Get the link of the first result
      window.location.href = link; // Redirect the current page to the link
    }
  }

  updatePreview(searchQuery) {
    // Query the preview container when needed
    const previewContainer =
      this.shadowRoot.querySelector(".preview-container");

    // Clear previous preview items
    previewContainer.innerHTML = "";

    if (!searchQuery) {
      // If the search input is empty, hide the preview container and return
      previewContainer.style.display = "none";
      return;
    }

    // Filter your JSON data based on the searchQuery and create preview items
    const filteredData = this.jsonData.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Handle keyboard navigation within the preview list
    let selectedPreviewItem = null;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const previewItems = previewContainer.querySelectorAll("div");
        const currentIndex =
          Array.from(previewItems).indexOf(selectedPreviewItem);

        if (
          event.key === "ArrowDown" &&
          currentIndex < previewItems.length - 1
        ) {
          selectPreview(previewItems[currentIndex + 1]);
        } else if (event.key === "ArrowUp" && currentIndex > 0) {
          selectPreview(previewItems[currentIndex - 1]);
        }
      } else if (event.key === "Enter" && selectedPreviewItem) {
        window.location.href = selectedPreviewItem.dataset.link;
      }
    };

    const selectPreview = (previewItem) => {
      if (selectedPreviewItem) {
        selectedPreviewItem.classList.remove("selected");
      }
      selectedPreviewItem = previewItem;
      if (selectedPreviewItem) {
        selectedPreviewItem.classList.add("selected");
      }
    };

    // Attach the keydown event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    filteredData.forEach((item) => {
      const previewItem = document.createElement("div");
      previewItem.textContent = item.title;
      previewItem.dataset.link = item.link; // Store the link in a data attribute

      previewItem.addEventListener("click", () => {
        // Handle click on a preview item, e.g., load the corresponding page
        window.location.href = item.link;
      });

      previewItem.addEventListener("mouseenter", () => {
        selectPreview(previewItem);
      });

      previewContainer.appendChild(previewItem);
    });

    // Show/hide the preview container based on whether there are results
    if (filteredData.length > 0) {
      previewContainer.style.display = "flex";
    } else {
      previewContainer.style.display = "none";
    }

    // Cleanup the event listener when the input value changes
    const searchInput = this.shadowRoot.querySelector(".search-input");
    searchInput.addEventListener("input", () => {
      document.removeEventListener("keydown", handleKeyDown);
    });
  }
}

customElements.define("responsive-navigation", ResponsiveNavigation);
