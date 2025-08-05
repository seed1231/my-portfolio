/* ==========================================
   Project Detail Page JavaScript
   ========================================== */

const ProjectDetail = {
  init() {
    this.initNavigation();
    this.initPageAnimations();
    this.initGallery();
    
    // Hide loader
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
          loader.classList.add('hidden');
        }
      }, 500);
    });
  },

  // Navigation functionality
  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar background on scroll
    window.addEventListener('scroll', Utils.throttle(() => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    }, 100));

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isOpen);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  },

  // Page animations
  initPageAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero content
    const heroTimeline = gsap.timeline({ delay: 0.2 });
    
    heroTimeline
      .from('.back-link', {
        opacity: 0,
        x: -20,
        duration: 0.6
      })
      .from('.project-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, '-=0.3')
      .from('.project-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.4')
      .from('.project-meta span', {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.1
      }, '-=0.3');

    // Animate gallery images
    gsap.from('.gallery-main img', {
      scrollTrigger: {
        trigger: '.project-gallery',
        start: 'top 80%'
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8
    });

    gsap.from('.gallery-grid img', {
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15
    });

    // Animate project details
    gsap.from('.details-content > *', {
      scrollTrigger: {
        trigger: '.project-details',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    });

    gsap.from('.info-card', {
      scrollTrigger: {
        trigger: '.info-card',
        start: 'top 80%'
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });

    // Animate results section
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1
      });

      // Animate numbers
      const numberElement = card.querySelector('.result-number');
      const finalNumber = numberElement.textContent;
      
      gsap.from(numberElement, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        textContent: 0,
        duration: 2,
        delay: index * 0.1 + 0.3,
        snap: { textContent: 1 },
        onUpdate: function() {
          const value = this.targets()[0].textContent;
          if (finalNumber.includes('%')) {
            numberElement.textContent = Math.floor(value) + '%';
          } else if (finalNumber.includes('s')) {
            numberElement.textContent = (value / 10).toFixed(1) + 's';
          } else {
            numberElement.textContent = Math.floor(value);
          }
        }
      });
    });

    // Animate project navigation
    gsap.from('.nav-prev, .nav-next', {
      scrollTrigger: {
        trigger: '.project-navigation',
        start: 'top 90%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    });
  },

  // Gallery functionality
  initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
      image.addEventListener('click', () => {
        this.openImageModal(image.src, image.alt);
      });
      
      // Add cursor pointer style
      image.style.cursor = 'pointer';
    });
  },

  // Open image in modal
  openImageModal(src, alt) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="image-modal-overlay"></div>
      <div class="image-modal-content">
        <button class="image-modal-close" aria-label="關閉">×</button>
        <img src="${src}" alt="${alt}">
      </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-6);
      }
      
      .image-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
      }
      
      .image-modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
      }
      
      .image-modal-content img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: var(--md-shape-medium);
      }
      
      .image-modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        width: 40px;
        height: 40px;
        background-color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--duration-fast) var(--ease-in-out);
      }
      
      .image-modal-close:hover {
        transform: rotate(90deg);
      }
      
      @media (max-width: 768px) {
        .image-modal-close {
          top: 10px;
          right: 10px;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    gsap.from('.image-modal-overlay', {
      opacity: 0,
      duration: 0.3
    });
    
    gsap.from('.image-modal-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
    
    // Close modal functionality
    const closeModal = () => {
      gsap.to('.image-modal-overlay', {
        opacity: 0,
        duration: 0.3
      });
      
      gsap.to('.image-modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          modal.remove();
          style.remove();
          document.body.style.overflow = '';
        }
      });
    };
    
    modal.querySelector('.image-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.image-modal-overlay').addEventListener('click', closeModal);
    
    // ESC key to close
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    
    document.addEventListener('keydown', escHandler);
  }
};

// Initialize when DOM is ready
Utils.ready(() => {
  ProjectDetail.init();
});