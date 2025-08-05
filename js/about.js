/* ==========================================
   About Page JavaScript
   ========================================== */

const AboutPage = {
  // Skills data
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

  init() {
    this.initNavigation();
    this.initSkills();
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
              if (counter) {
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

  // Page animations
  initPageAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

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

    // Animate about section
    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%'
      },
      x: -100,
      opacity: 0,
      duration: 0.8
    });

    gsap.from('.about-text h2', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2
    });

    gsap.from('.about-text p', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.4
    });

    gsap.from('.about-tags .tag', {
      scrollTrigger: {
        trigger: '.about-tags',
        start: 'top 90%'
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    // Animate skills section
    gsap.from('.skill-category', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    });

    gsap.from('.skill-item', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3
    });

    // Animate timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      gsap.from(item.querySelector('.timeline-content'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.2
      });

      gsap.from(item.querySelector('.timeline-marker'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%'
        },
        scale: 0,
        duration: 0.4,
        delay: index * 0.2 + 0.3,
        ease: "back.out(1.7)"
      });
    });

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 90%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
      });
    });
  }
};

// Initialize when DOM is ready
Utils.ready(() => {
  AboutPage.init();
});