/* ==========================================
   GSAP Animations - Portfolio Website
   ========================================== */

const Animations = {
  // Initialize GSAP and plugins
  init() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Set default ease
    gsap.defaults({ ease: "power2.out" });
    
    // Initialize animations
    this.initLoaderAnimation();
    this.initHeroAnimations();
    this.initScrollAnimations();
    this.initParallaxEffects();
  },

  // Loader animation
  initLoaderAnimation() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const tl = gsap.timeline({
      onComplete: () => {
        loader.classList.add('hidden');
        this.playIntroAnimation();
      }
    });

    tl.to('.loader-spinner', {
      rotation: 360,
      duration: 1,
      repeat: 2,
      ease: "none"
    })
    .to('.loader', {
      opacity: 0,
      duration: 0.5
    });
  },

  // Intro animation after loader
  playIntroAnimation() {
    const tl = gsap.timeline();

    // Animate navigation
    tl.from('.navbar', {
      y: -100,
      opacity: 0,
      duration: 0.8
    })
    .from('.nav-logo', {
      x: -50,
      opacity: 0,
      duration: 0.6
    }, "-=0.4")
    .from('.nav-link', {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.4");

    // Trigger hero animations
    this.animateHeroSection();
  },

  // Hero section animations
  initHeroAnimations() {
    // Set initial states
    gsap.set('.hero-title span', { opacity: 0, y: 50 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
    gsap.set('.hero-description', { opacity: 0, y: 30 });
    gsap.set('.hero-cta .btn', { opacity: 0, y: 30 });
  },

  // Animate hero section
  animateHeroSection() {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate title with typewriter effect
    tl.to('.hero-greeting', {
      opacity: 1,
      y: 0,
      duration: 0.6
    })
    .to('.hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      onComplete: () => {
        this.typewriterEffect('.hero-name', '.hero-name');
      }
    }, "-=0.2")
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.2")
    .to('.hero-description', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.3")
    .to('.hero-cta .btn', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2
    }, "-=0.3");
  },

  // Typewriter effect
  typewriterEffect(element, text) {
    const el = document.querySelector(element);
    if (!el) return;

    const originalText = el.textContent;
    el.textContent = '';
    el.style.opacity = '1';

    let index = 0;
    const type = () => {
      if (index < originalText.length) {
        el.textContent += originalText.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    };
    type();
  },

  // Initialize scroll-triggered animations
  initScrollAnimations() {
    // About section animations
    ScrollTrigger.create({
      trigger: '.about-section',
      start: 'top 80%',
      onEnter: () => this.animateAboutSection()
    });

    // Skills section animations
    ScrollTrigger.create({
      trigger: '.skills-section',
      start: 'top 80%',
      onEnter: () => this.animateSkillsSection()
    });

    // Portfolio section animations
    ScrollTrigger.create({
      trigger: '.portfolio-section',
      start: 'top 80%',
      onEnter: () => this.animatePortfolioSection()
    });

    // Featured projects section animations
    ScrollTrigger.create({
      trigger: '.featured-projects-section',
      start: 'top 80%',
      onEnter: () => this.animateFeaturedProjectsSection()
    });

    // Contact section animations
    ScrollTrigger.create({
      trigger: '.contact-section',
      start: 'top 80%',
      onEnter: () => this.animateContactSection()
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
      });

      // Animate underline
      gsap.from(title.querySelector('::after'), {
        scrollTrigger: {
          trigger: title,
          start: 'top 90%'
        },
        width: 0,
        duration: 0.8,
        delay: 0.3
      });
    });
  },

  // About section animation
  animateAboutSection() {
    const tl = gsap.timeline();

    tl.from('.about-image', {
      x: -100,
      opacity: 0,
      duration: 0.8
    })
    .from('.about-text h3', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, "-=0.4")
    .from('.about-text p', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    }, "-=0.4")
    .from('.about-tags .tag', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.2");
  },

  // Skills section animation
  animateSkillsSection() {
    // This will be called when skills are dynamically added
    const skills = document.querySelectorAll('.skill-item');
    
    gsap.from(skills, {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    });
  },

  // Portfolio section animation
  animatePortfolioSection() {
    // Animate filter buttons
    gsap.from('.filter-btn', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    });

    // This will be called when portfolio items are dynamically added
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    gsap.from(portfolioCards, {
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      onComplete: () => {
        this.initPortfolioHoverEffects();
      }
    });
  },

  // Portfolio hover effects
  initPortfolioHoverEffects() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
      const image = card.querySelector('img');
      const overlay = card.querySelector('.portfolio-card-overlay');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.4
        });
        
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.4
        });
        
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      });
    });
  },

  // Featured projects section animation
  animateFeaturedProjectsSection() {
    const projects = document.querySelectorAll('.featured-project');
    
    projects.forEach((project, index) => {
      const content = project.querySelector('.featured-project-content');
      const image = project.querySelector('.featured-project-image');
      const isReverse = project.classList.contains('featured-project-reverse');
      
      // Animate content
      gsap.from(content, {
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: isReverse ? 50 : -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      });
      
      // Animate image
      gsap.from(image, {
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: isReverse ? -50 : 50,
        opacity: 0,
        duration: 0.8
      });
      
      // Animate individual elements
      gsap.from(project.querySelectorAll('.featured-project-year, .featured-project-title, .featured-project-subtitle, .featured-project-description, .md-button'), {
        scrollTrigger: {
          trigger: project,
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4
      });
    });
  },

  // Contact section animation
  animateContactSection() {
    const tl = gsap.timeline();

    tl.from('.contact-info h3', {
      y: 30,
      opacity: 0,
      duration: 0.6
    })
    .from('.contact-info p', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, "-=0.3")
    .from('.contact-link', {
      x: -30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.3")
    .from('.contact-form', {
      scale: 0.95,
      opacity: 0,
      duration: 0.8
    }, "-=0.6")
    .from('.form-group', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.4");
  },

  // Parallax effects
  initParallaxEffects() {
    // Hero background parallax
    gsap.to('.hero-background', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      ease: "none"
    });

    // Create floating shapes in hero
    this.createFloatingShapes();
  },

  // Create floating background shapes
  createFloatingShapes() {
    const heroSection = document.querySelector('.hero-section');
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 5; i++) {
      const shape = document.createElement('div');
      shape.className = `floating-shape floating-${shapes[i % 3]}`;
      shape.style.cssText = `
        position: absolute;
        width: ${Utils.getRandomInt(20, 60)}px;
        height: ${Utils.getRandomInt(20, 60)}px;
        background-color: ${colors[i % 3]};
        opacity: 0.1;
        border-radius: ${shapes[i % 3] === 'circle' ? '50%' : '10%'};
        top: ${Utils.getRandomInt(10, 90)}%;
        left: ${Utils.getRandomInt(10, 90)}%;
        z-index: 0;
      `;
      
      heroSection.appendChild(shape);
      
      // Animate floating shapes
      gsap.to(shape, {
        y: Utils.getRandomInt(-50, 50),
        x: Utils.getRandomInt(-50, 50),
        rotation: Utils.getRandomInt(-180, 180),
        duration: Utils.getRandomInt(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  },

  // Skill progress animation
  animateSkillProgress(element, percentage) {
    const progressBar = element.querySelector('.skill-progress-bar');
    const counter = element.querySelector('.skill-percentage');
    
    gsap.to(progressBar, {
      width: `${percentage}%`,
      duration: 1.5,
      ease: "power2.out"
    });
    
    if (counter) {
      gsap.to(counter, {
        textContent: percentage,
        duration: 1.5,
        snap: { textContent: 1 },
        onUpdate: function() {
          counter.textContent = Math.floor(this.targets()[0].textContent) + '%';
        }
      });
    }
  },

  // Modal animations
  showModal(modal) {
    modal.classList.add('active');
    
    gsap.fromTo('.modal-overlay', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.3
    });
    
    gsap.fromTo('.modal-content', {
      scale: 0.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  },

  hideModal(modal) {
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3
    });
    
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.classList.remove('active');
      }
    });
  },

  // Magnetic button effect
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.3
        });
      });
    });
  },

  // Reveal text animation
  revealText(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char';
        el.appendChild(span);
      });
      
      gsap.from(el.querySelectorAll('.char'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.02
      });
    });
  },

  // Refresh ScrollTrigger
  refresh() {
    ScrollTrigger.refresh();
  }
};