# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website project that showcases personal professional skills, projects, and experience. The website uses pure frontend technologies (HTML, CSS, JavaScript, GSAP) to create a visually appealing and smooth user experience, inspired by https://kat-wang.framer.website/en/.

## Project Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Main styles
│   ├── responsive.css     # Responsive design
│   └── animations.css     # Animation styles
├── js/
│   ├── main.js           # Main JavaScript logic
│   ├── animations.js     # GSAP animations
│   └── utils.js          # Utility functions
├── assets/
│   ├── images/           # Image assets
│   ├── icons/            # Icon files
│   └── fonts/            # Custom fonts
└── libs/
    └── gsap/             # GSAP library files
```

## Key Technologies

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern layouts with Grid/Flexbox, custom animations
- **JavaScript**: Interactive functionality and DOM manipulation
- **GSAP**: Advanced animations with ScrollTrigger plugin

## Development Commands

Since this is a pure frontend project with no build tools:
- Open `index.html` directly in a browser for development
- Use a local server (e.g., `python -m http.server` or VS Code Live Server) for better development experience
- No build or compilation steps required

## Architecture and Code Patterns

### Single Page Application (SPA)
The website is structured as a single-page application with section-based navigation:
- Hero Section: Landing area with personal branding
- About Section: Personal introduction and background
- Skills Section: Visual skill representation with progress bars
- Portfolio Section: Project showcase with modal details
- Contact Section: Contact form and social links

### Animation Strategy
- **Page Load**: GSAP timeline animations for initial content reveal
- **Scroll-triggered**: ScrollTrigger plugin for section animations
- **Micro-interactions**: Hover effects and interactive feedback
- **Performance**: Use `will-change` property and clean up after animations

### Responsive Design
- Mobile-first approach with breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Hamburger menu for mobile navigation
- Touch-optimized interactions

### JavaScript Patterns
```javascript
// Module pattern for organization
const Portfolio = {
  init() {
    this.initNavigation();
    this.initAnimations();
    this.initPortfolio();
    this.initContactForm();
  }
};

// GSAP animation pattern
gsap.from(".element", {
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%"
  },
  duration: 1,
  opacity: 0,
  y: 50
});
```

### CSS Architecture
- CSS custom properties for theme management
- BEM methodology for class naming
- Separate files for different concerns (layout, animations, responsive)

## Important Implementation Notes

1. **GSAP Integration**: Always check if GSAP is loaded before using animations
2. **Accessibility**: Include ARIA labels, keyboard navigation, and respect `prefers-reduced-motion`
3. **Performance**: Lazy load images, optimize animations for 60fps
4. **Browser Support**: Modern browsers (Chrome 80+, Firefox 75+, Safari 13+)
5. **Form Handling**: Client-side validation only (no backend)

## Testing Checklist

When implementing features, ensure:
- [ ] Responsive layout works on all devices
- [ ] Animations are smooth and performant
- [ ] Keyboard navigation is functional
- [ ] Form validation provides clear feedback
- [ ] Images are optimized and lazy-loaded
- [ ] Cross-browser compatibility is maintained

## Reference Implementation

The design and interaction patterns are inspired by https://kat-wang.framer.website/en/, particularly:
- Smooth scroll animations
- Project card hover effects
- Section transition animations
- Modern, clean visual design