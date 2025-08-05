/* ==========================================
   Portfolio Page JavaScript
   ========================================== */

const PortfolioPage = {
  // Projects data - only showing first 3 for separate pages
  projects: [
    {
      id: 1,
      title: "電商網站設計",
      description: "現代化的電商平台界面設計",
      category: "web",
      technologies: ["React", "GSAP", "Tailwind CSS"],
      image: "assets/images/project1.jpg",
      detailPage: "project-one.html"
    },
    {
      id: 2,
      title: "企業形象網站",
      description: "專業的企業形象展示網站",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      image: "assets/images/project2.jpg",
      detailPage: "project-two.html"
    },
    {
      id: 3,
      title: "互動式資料視覺化",
      description: "數據分析儀表板設計",
      category: "animation",
      technologies: ["D3.js", "GSAP", "Vue.js"],
      image: "assets/images/project3.jpg",
      detailPage: "project-three.html"
    },
    {
      id: 4,
      title: "品牌識別設計",
      description: "完整的品牌視覺系統",
      category: "design",
      technologies: ["Figma", "Adobe Illustrator", "Brand Design"],
      image: "assets/images/project4.jpg",
      detailPage: "#"
    },
    {
      id: 5,
      title: "移動應用界面",
      description: "iOS/Android 應用程式設計",
      category: "design",
      technologies: ["Figma", "Principle", "Mobile Design"],
      image: "assets/images/project5.jpg",
      detailPage: "#"
    },
    {
      id: 6,
      title: "3D 動畫網站",
      description: "WebGL 互動體驗",
      category: "animation",
      technologies: ["Three.js", "GSAP", "WebGL"],
      image: "assets/images/project6.jpg",
      detailPage: "#"
    }
  ],

  init() {
    this.initNavigation();
    this.initPortfolio();
    this.initPageAnimations();
    
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

  // Initialize portfolio
  initPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.md-chip');
    
    if (!portfolioGrid) return;

    // Create portfolio items
    this.projects.forEach(project => {
      const projectCard = this.createProjectCard(project);
      portfolioGrid.appendChild(projectCard);
    });

    // Filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update selected button
        filterButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        
        // Filter projects
        const projectCards = portfolioGrid.querySelectorAll('.portfolio-card');
        projectCards.forEach(card => {
          const category = card.dataset.category;
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            gsap.fromTo(card, {
              opacity: 0,
              scale: 0.8
            }, {
              opacity: 1,
              scale: 1,
              duration: 0.5
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              onComplete: () => {
                card.style.display = 'none';
              }
            });
          }
        });
      });
    });
  },

  // Create project card
  createProjectCard(project) {
    // Create card as a link element for better accessibility
    const card = Utils.createElement('a', {
      className: 'portfolio-card md-card',
      'data-category': project.category,
      'data-project-id': project.id,
      href: project.detailPage,
      style: 'text-decoration: none; color: inherit; display: block;'
    });

    const imageContainer = Utils.createElement('div', {
      className: 'portfolio-card-image'
    });

    const image = Utils.createElement('img', {
      src: project.image,
      alt: project.title,
      loading: 'lazy'
    });

    const overlay = Utils.createElement('div', {
      className: 'portfolio-card-overlay'
    });

    const overlayContent = Utils.createElement('div', {
      className: 'portfolio-card-overlay-content'
    });

    const overlayTitle = Utils.createElement('h4', {
      innerHTML: project.title
    });

    const overlayDescription = Utils.createElement('p', {
      innerHTML: project.description
    });

    overlayContent.appendChild(overlayTitle);
    overlayContent.appendChild(overlayDescription);
    overlay.appendChild(overlayContent);

    imageContainer.appendChild(image);
    imageContainer.appendChild(overlay);

    const content = Utils.createElement('div', {
      className: 'portfolio-card-content'
    });

    const title = Utils.createElement('h4', {
      innerHTML: project.title
    });

    const description = Utils.createElement('p', {
      innerHTML: project.description
    });

    const technologies = Utils.createElement('div', {
      className: 'portfolio-technologies'
    });

    project.technologies.forEach(tech => {
      const techTag = Utils.createElement('span', {
        className: 'tech-tag md-chip',
        innerHTML: tech
      });
      technologies.appendChild(techTag);
    });

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(technologies);

    card.appendChild(imageContainer);
    card.appendChild(content);

    // Prevent navigation for placeholder links
    if (project.detailPage === '#') {
      card.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }

    return card;
  },


  // Page animations
  initPageAnimations() {
    // Animate page title
    gsap.to('.page-title', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2
    });

    gsap.to('.page-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4
    });

    // Animate filter buttons
    gsap.from('.md-chip', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      delay: 0.6
    });

    // Animate portfolio cards on load
    const cards = document.querySelectorAll('.portfolio-card');
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.8,
      onComplete: () => {
        // Initialize hover effects after animation
        this.initHoverEffects();
      }
    });
  },

  // Initialize hover effects
  initHoverEffects() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
      const image = card.querySelector('img');
      const overlay = card.querySelector('.portfolio-card-overlay');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.4
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.4
        });
      });
    });
  }
};

// Initialize when DOM is ready
Utils.ready(() => {
  PortfolioPage.init();
});