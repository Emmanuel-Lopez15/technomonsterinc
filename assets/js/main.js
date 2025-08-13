(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

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
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
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
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
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
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Function to open specific tab when clicking menu links
   */
  function openTabFromHash() {
    const hash = window.location.hash;
    if (!hash || hash === '#') return;

    try {
      const targetElement = document.querySelector(hash);
      if (!targetElement) return;

      // Handle main tabs
      const parentTab = targetElement.closest('.resources-item');
      if (parentTab) {
        // Close all other main tabs
        document.querySelectorAll('.resources-item').forEach(item => {
          if (item !== parentTab) {
            item.classList.remove('resources-active');
            const content = item.querySelector('.resources-content');
            if (content) {
              content.style.maxHeight = '0';
            }
          }
        });

        // Open target main tab
        parentTab.classList.add('resources-active');
        const content = parentTab.querySelector('.resources-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }

      // Handle sub-tabs
      const subTab = targetElement.closest('.resources-subitem');
      if (subTab) {
        // Close all other sub-tabs in the same parent
        const parentContent = subTab.closest('.resources-content');
        if (parentContent) {
          parentContent.querySelectorAll('.resources-subitem').forEach(item => {
            if (item !== subTab) {
              item.classList.remove('resources-subactive');
              const subContent = item.querySelector('.resources-subcontent');
              if (subContent) {
                subContent.style.maxHeight = '0';
              }
            }
          });
        }

        // Open target sub-tab
        subTab.classList.add('resources-subactive');
        const subContent = subTab.querySelector('.resources-subcontent');
        if (subContent) {
          subContent.style.maxHeight = subContent.scrollHeight + 'px';
        }

        // Ensure parent tab is open
        if (parentTab && !parentTab.classList.contains('resources-active')) {
          parentTab.classList.add('resources-active');
          const parentContent = parentTab.querySelector('.resources-content');
          if (parentContent) {
            parentContent.style.maxHeight = parentContent.scrollHeight + 'px';
          }
        }
      }
    } catch (e) {
      console.error('Error opening tab:', e);
    }
  }

  /**
   * Handle hash changes
   */
  function handleHashChange() {
    openTabFromHash();
  }

  /**
   * Improved click handler for anchor links
   */
  function setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        if (this.classList.contains('toggle-dropdown')) return;

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();

        // Close mobile menu if open
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }

        // Update URL
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }

        // Open tabs
        openTabFromHash();

        // Smooth scroll after tabs are opened
        setTimeout(() => {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      });
    });
  }

  // Initialize on load and hash change
  window.addEventListener('load', function () {
    setupAnchorLinks();
    openTabFromHash();
  });

  window.addEventListener('hashchange', handleHashChange);

})();