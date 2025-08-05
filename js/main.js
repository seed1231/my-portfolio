/* ==========================================
   Main JavaScript - Portfolio Website
   ========================================== */

const Portfolio = {
  // Data
  skills: [
    {
      category: "前端開發",
      items: [
        { name: "HTML/CSS", level: 90, icon: "html" },
        { name: "JavaScript", level: 85, icon: "js" },
        { name: "React", level: 80, icon: "react" },
        { name: "GSAP", level: 75, icon: "gsap" }
      ]
    },
    {
      category: "設計工具",
      items: [
        { name: "Figma", level: 85, icon: "figma" },
        { name: "Adobe XD", level: 70, icon: "xd" },
        { name: "Photoshop", level: 75, icon: "ps" }
      ]
    },
    {
      category: "其他技能",
      items: [
        { name: "Git", level: 80, icon: "git" },
        { name: "Webpack", level: 70, icon: "webpack" },
        { name: "Node.js", level: 65, icon: "node" }
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "電商網站設計",
      description: "現代化的電商平台界面設計",
      longDescription: "為新創電商公司設計的完整購物平台，包含產品展示、購物車、結帳流程等功能。使用 React 和 GSAP 打造流暢的使用者體驗。",
      category: "web",
      technologies: ["React", "GSAP", "Tailwind CSS"],
      image: "assets/images/project1.jpg",
      images: ["assets/images/project1-1.jpg", "assets/images/project1-2.jpg"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 2,
      title: "企業形象網站",
      description: "專業的企業形象展示網站",
      longDescription: "為科技公司打造的企業形象網站，強調專業性和創新性。包含公司介紹、服務項目、案例展示等區塊。",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      image: "assets/images/project2.jpg",
      images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 3,
      title: "互動式資料視覺化",
      description: "數據分析儀表板設計",
      longDescription: "互動式的數據視覺化專案，使用 D3.js 和 GSAP 創造動態圖表和資料展示效果。",
      category: "animation",
      technologies: ["D3.js", "GSAP", "Vue.js"],
      image: "assets/images/project3.jpg",
      images: ["assets/images/project3-1.jpg", "assets/images/project3-2.jpg"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ],

  // Initialize
  init() {
    this.initNavigation();
    this.initSkills();
    this.initPortfolio();
    this.initContactForm();
    this.initScrollEffects();
    
    // Initialize animations after DOM is ready
    if (typeof gsap !== 'undefined') {
      Animations.init();
      Animations.initMagneticButtons();
    }
    
    // Initialize lazy loading
    Utils.lazyLoadImages();
    
    // Hide loader after everything is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader && !loader.classList.contains('hidden')) {
          loader.classList.add('hidden');
          if (typeof Animations !== 'undefined') {
            Animations.playIntroAnimation();
          }
        }
      }, 1000);
    });
  },

  // Navigation functionality
  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isOpen);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Handle navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Check if it's an anchor link
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(href);
          
          if (targetSection) {
            Utils.smoothScrollTo(targetSection, 1000);
          }
        }
        
        // Close mobile menu
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href').split('#')[0];
      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update active nav link on scroll for anchor sections
    const updateActiveLink = () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
              link.classList.remove('active');
            }
          });
          correspondingLink.classList.add('active');
        }
      });
    };

    // Navbar background on scroll
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
      updateActiveLink();
    }, 100);

    window.addEventListener('scroll', handleScroll);
  },

  // Initialize skills section
  initSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    this.skills.forEach((category, categoryIndex) => {
      const categoryDiv = Utils.createElement('div', {
        className: 'skill-category'
      });

      const categoryTitle = Utils.createElement('h3', {
        className: 'skill-category-title',
        innerHTML: category.category
      });

      categoryDiv.appendChild(categoryTitle);

      const skillsList = Utils.createElement('div', {
        className: 'skills-list'
      });

      category.items.forEach((skill, index) => {
        const skillItem = this.createSkillItem(skill, categoryIndex * 10 + index);
        skillsList.appendChild(skillItem);
      });

      categoryDiv.appendChild(skillsList);
      skillsGrid.appendChild(categoryDiv);
    });

    // Trigger skill animations when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
          progressBars.forEach(bar => {
            const level = bar.dataset.level;
            setTimeout(() => {
              bar.style.width = `${level}%`;
              
              // Animate counter
              const counter = bar.parentElement.nextElementSibling;
              if (counter && typeof Animations !== 'undefined') {
                Utils.animateCounter(counter, 0, level, 1500);
              }
            }, 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(item => {
      observer.observe(item);
    });
  },

  // Create skill item element
  createSkillItem(skill, index) {
    const skillItem = Utils.createElement('div', {
      className: 'skill-item',
      'data-index': index
    });

    const skillHeader = Utils.createElement('div', {
      className: 'skill-header'
    });

    const skillName = Utils.createElement('span', {
      className: 'skill-name',
      innerHTML: skill.name
    });

    const skillPercentage = Utils.createElement('span', {
      className: 'skill-percentage counter',
      innerHTML: '0%'
    });

    skillHeader.appendChild(skillName);
    skillHeader.appendChild(skillPercentage);

    const skillProgress = Utils.createElement('div', {
      className: 'skill-progress'
    });

    const skillProgressBar = Utils.createElement('div', {
      className: 'skill-progress-bar',
      'data-level': skill.level
    });

    skillProgress.appendChild(skillProgressBar);
    
    skillItem.appendChild(skillHeader);
    skillItem.appendChild(skillProgress);

    return skillItem;
  },

  // Initialize portfolio section
  initPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
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

  // Create project card element
  createProjectCard(project) {
    const card = Utils.createElement('div', {
      className: 'portfolio-card',
      'data-category': project.category,
      'data-project-id': project.id
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
        className: 'tech-tag',
        innerHTML: tech
      });
      technologies.appendChild(techTag);
    });

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(technologies);

    card.appendChild(imageContainer);
    card.appendChild(content);

    // Add click event for modal
    card.addEventListener('click', () => {
      this.showProjectModal(project);
    });

    return card;
  },

  // Show project modal
  showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
      <div class="modal-images">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="modal-description">
        <p>${project.longDescription}</p>
      </div>
      <div class="modal-technologies">
        <h4>使用技術</h4>
        <div class="tech-tags">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="modal-links">
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">查看網站</a>` : ''}
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">GitHub</a>` : ''}
      </div>
    `;
    
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    if (typeof Animations !== 'undefined') {
      Animations.showModal(modal);
    } else {
      modal.classList.add('active');
    }
    
    // Close modal events
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
      if (typeof Animations !== 'undefined') {
        Animations.hideModal(modal);
      } else {
        modal.classList.remove('active');
      }
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  },

  // Initialize contact form
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Reset previous errors
      form.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = '';
        msg.classList.remove('show');
      });
      form.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
      });
      
      // Get form data
      const formData = Utils.parseFormData(form);
      const errors = this.validateForm(formData);
      
      // Show errors
      if (Object.keys(errors).length > 0) {
        for (const [field, message] of Object.entries(errors)) {
          const input = form.querySelector(`[name="${field}"]`);
          const errorMsg = input.parentElement.querySelector('.error-message');
          
          input.classList.add('error');
          errorMsg.textContent = message;
          errorMsg.classList.add('show');
        }
        return;
      }
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = '發送中...';
      
      // Simulate form submission
      setTimeout(() => {
        // Show success message
        const statusDiv = form.querySelector('.form-status');
        statusDiv.textContent = '訊息已成功發送！我會盡快回覆您。';
        statusDiv.classList.add('success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          statusDiv.classList.remove('success');
          statusDiv.textContent = '';
        }, 5000);
      }, 1500);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        const value = input.value.trim();
        const name = input.name;
        const errorMsg = input.parentElement.querySelector('.error-message');
        
        let error = '';
        
        if (!value && input.hasAttribute('required')) {
          error = '此欄位為必填';
        } else if (name === 'email' && value && !Utils.validateEmail(value)) {
          error = '請輸入有效的電子郵件地址';
        }
        
        if (error) {
          input.classList.add('error');
          errorMsg.textContent = error;
          errorMsg.classList.add('show');
        } else {
          input.classList.remove('error');
          errorMsg.textContent = '';
          errorMsg.classList.remove('show');
        }
      });
    });
  },

  // Validate form data
  validateForm(data) {
    const errors = {};
    
    if (!data.name || data.name.trim() === '') {
      errors.name = '請輸入您的姓名';
    }
    
    if (!data.email || data.email.trim() === '') {
      errors.email = '請輸入您的電子郵件';
    } else if (!Utils.validateEmail(data.email)) {
      errors.email = '請輸入有效的電子郵件地址';
    }
    
    if (!data.subject || data.subject.trim() === '') {
      errors.subject = '請輸入主題';
    }
    
    if (!data.message || data.message.trim() === '') {
      errors.message = '請輸入訊息內容';
    }
    
    return errors;
  },

  // Initialize scroll effects
  initScrollEffects() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          Utils.smoothScrollTo(target);
        }
      });
    });

  }
};

// Initialize when DOM is ready
Utils.ready(() => {
  Portfolio.init();
});