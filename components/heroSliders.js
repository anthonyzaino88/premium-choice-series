

class HeroSlider extends HTMLElement {
  constructor() {
    super();
    this.currentSlide = 0;
    this.interval = null;

    // Create a shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

           // Load external styles
  const stylesLink = document.createElement('link');
  stylesLink.setAttribute('rel', 'stylesheet');
  stylesLink.setAttribute('href', './styles/slider.css'); // Adjust the path as needed
  this.shadowRoot.appendChild(stylesLink);
    

    // Fetch the slider data
    fetch('../Data/sliderData.json')
      .then(response => response.json())
      .then(data => {
        this.sliderData = data.slider;
        this.renderSlider();
        this.renderPagination();
        this.startSlider();
      })
      .catch(error => console.error('Error fetching slider data:', error));
  }

  renderSlider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('hero-slider');

    // Loop through the slider data and create a slide for each item
    this.sliderData.forEach((slide, index) => {
      const slideElement = document.createElement('div');
      slideElement.classList.add('slide');
      slideElement.style.transform = `translateX(${(index - this.currentSlide) * 0}%)`; // Adjusted transform value
      slideElement.style.opacity = index === this.currentSlide ? '1' : '0'; // Show the active slide initially

      const imageElement = document.createElement('img');
      imageElement.src = slide.image;
      imageElement.alt = slide.description;
      imageElement.classList.add('image');

      slideElement.appendChild(imageElement);
      sliderContainer.appendChild(slideElement);
    });

    // Append the slider container to the shadow DOM
    this.shadowRoot.appendChild(sliderContainer);

    // Fade in the active slide
    setTimeout(() => {
      sliderContainer.firstElementChild.style.opacity = '1';
    }, 200);
  }


  renderPagination() {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    for (let index = 0; index < this.sliderData.length; index++) {
      const dotElement = document.createElement('span');
      dotElement.classList.add('dot');
      if (index === this.currentSlide) {
        dotElement.classList.add('active');
      }
      dotElement.setAttribute('data-slide-index', index);

      dotElement.addEventListener('click', (event) => {
        const slideIndex = parseInt(event.target.getAttribute('data-slide-index'));
        this.showSlide(slideIndex);
      });

      paginationContainer.appendChild(dotElement);
    }

    this.shadowRoot.appendChild(paginationContainer);
  }

  startSlider() {
    this.showSlide(this.currentSlide); // Display the initial slide immediately

    this.interval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Adjust the interval as needed
  }

  showSlide(index) {
    const slides = this.shadowRoot.querySelectorAll('.slide');
    const dots = this.shadowRoot.querySelectorAll('.dot');
  
    const currentSlide = slides[this.currentSlide];
    const nextSlide = slides[index];
  
    const currentDot = dots[this.currentSlide];
    const nextDot = dots[index];
  
    // Fade out current slide
    currentSlide.style.opacity = '0';
    currentSlide.style.transition = 'opacity 2s';
  
    // Update active dot
    currentDot.classList.remove('active');
    nextDot.classList.add('active');
  
    setTimeout(() => {
      // Reset current slide
      currentSlide.style.transition = '';
      currentSlide.style.opacity = '';
      currentSlide.style.display = '';
  
      // Hide other slides
      slides.forEach((slide) => {
        slide.style.display = 'none';
      });
  
      // Show and fade in next slide
      nextSlide.style.display = 'flex';
      nextSlide.style.opacity = '1';
      nextSlide.style.transition = 'opacity 3s';
    }, 2000);
  
    this.currentSlide = index;
  }
  
  nextSlide() {
    const slides = this.shadowRoot.querySelectorAll('.slide');
    const totalSlides = slides.length;

    const currentSlide = slides[this.currentSlide];
    const nextSlideIndex = (this.currentSlide + 1) % totalSlides;
    const nextSlide = slides[nextSlideIndex];

    // Fade out current slide
    currentSlide.style.opacity = '0';
    currentSlide.style.transition = 'opacity 1s';

    setTimeout(() => {
      // Reset current slide

      currentSlide.style.opacity = '';
      currentSlide.style.display = 'none';

      // Fade in next slide
      nextSlide.style.display = 'flex';
      nextSlide.style.opacity = '1';
      currentSlide.style.transition = 'opacity 2s';

    }, 1000);

    const dots = this.shadowRoot.querySelectorAll('.dot');
    dots[this.currentSlide].classList.remove('active');
    dots[nextSlideIndex].classList.add('active');

    this.currentSlide = nextSlideIndex;
  }

  connectedCallback() {
    // Implement your slider functionality here, such as adding event listeners or initializing a third-party slider library
  }
}

// Define the custom element tag
customElements.define('hero-slider', HeroSlider);



