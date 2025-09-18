/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills progress bars on scroll (Using Intersection Observer)
   */
  
  // Initialize progress bars to 0% (no debug colors/forced styles)
  document.querySelectorAll('.skills .progress-bar').forEach((bar) => {
    bar.style.width = '0%';
  });
  
  function animateProgressBars() {
    const skillsSection = document.querySelector('.skills-animation');
    if (!skillsSection) return;
    
    const progressBars = skillsSection.querySelectorAll('.progress-bar-wrap .progress-bar');
    console.log(`🎯 STARTING ANIMATION - Found ${progressBars.length} progress bars`);
    
    progressBars.forEach((bar, index) => {
      const targetWidth = bar.getAttribute('aria-valuenow');
      console.log(`🚀 Bar ${index + 1}: Animating to ${targetWidth}%`);
      
      // Reset initial state
      bar.style.width = '0%';
      bar.style.opacity = '0.8';
      bar.style.transform = 'scaleY(0.9)';
      bar.style.display = 'block';
      
      // Start animation with delay
      setTimeout(() => {
        console.log(`⚡ Starting animation for bar ${index + 1}`);
        
        // FORCE the bar to be completely visible first
        bar.style.display = 'block';
        bar.style.visibility = 'visible';
        bar.style.height = '28px';
        bar.style.background = 'linear-gradient(135deg, #FF69B4, #FFB6C1, #9370DB)';
        bar.style.borderRadius = '14px';
        bar.style.position = 'relative';
        
        // Set transition properties
        bar.style.transition = 'width 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease, transform 0.6s ease, box-shadow 0.5s ease';
        
        // Force immediate visual feedback
        bar.style.width = '5%'; // Small initial width to show it's working
        setTimeout(() => {
          // Now animate to full target
          bar.style.width = targetWidth + '%';
          bar.style.opacity = '1';
          bar.style.transform = 'scaleY(1)';
          console.log(`📊 Bar ${index + 1} should now be ${targetWidth}% width`);
        }, 100);
        
        // Add glow effect during animation
        setTimeout(() => {
          bar.style.boxShadow = '0 6px 25px rgba(255, 105, 180, 0.9)';
          setTimeout(() => {
            bar.style.boxShadow = '0 2px 8px rgba(255, 105, 180, 0.4)';
          }, 400);
        }, 1000);
        
        // Final bounce
        setTimeout(() => {
          bar.style.transform = 'scaleY(1.1)';
          setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
          }, 200);
        }, 2400);
        
      }, index * 300);
    });
  }
  
  // Use Intersection Observer for more reliable detection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        console.log('🔥 Skills section is visible! Starting animations...');
        animateProgressBars();
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // (Removed debug logging)
  
  // Start observing
  const skillsSection = document.querySelector('.skills-animation');
  if (skillsSection) {
    observer.observe(skillsSection);
    console.log('👀 Observer set up for skills section');
  } else {
    console.error('❌ Skills section not found!');
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Theme Switcher
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Toggle theme
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

})();