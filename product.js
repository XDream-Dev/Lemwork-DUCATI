/* ============================================
   PRODUCT PAGE - MODERN INTERACTIVE JS
   Parallax, 3D Effects, Animations, Interactions
   ============================================ */

(function () {
  "use strict";

  // ============================================
  // DYNAMIC MODEL INITIALIZATION
  // ============================================
  function initDynamicModel() {
    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get("model");

    const modelData = {
      "rosso-ducati": {
        name: "Rosso Ducati",
        price: "$18,995",
        oldPrice: "$21,500",
        image: "./assets/red_moto.png",
        color: "#e30613",
      },
      "giallo-strada": {
        name: "Giallo Strada",
        price: "$19,495",
        oldPrice: "$21,500",
        image: "./assets/yellow.png",
        color: "#ffd700",
      },
      "verde-corse": {
        name: "Verde Corse",
        price: "$18,995",
        oldPrice: "$21,500",
        image: "./assets/green_moto.png",
        color: "#006400",
      },
      "bianco-pulse": {
        name: "Bianco Pulse",
        price: "$19,295",
        oldPrice: "$21,500",
        image: "./assets/white_moto.png",
        color: "#0a0a0a",
      },
      "bronzo-veloce": {
        name: "Bronzo Veloce",
        price: "$19,995",
        oldPrice: "$21,500",
        image: "./assets/brown_moto.png",
        color: "#cf9800",
      },
    };

    if (model && modelData[model]) {
      const data = modelData[model];

      // Update Title and Subtitle
      const titleEl = document.querySelector(".product-title");
      if (titleEl) titleEl.textContent = data.name;

      // Update Price
      const priceEl = document.querySelector(".product-price");
      if (priceEl) priceEl.textContent = data.price;

      // Update Images
      const heroMoto = document.getElementById("hero-moto");
      if (heroMoto) heroMoto.src = data.image;

      const techMainImg = document.getElementById("tech-main-img");
      if (techMainImg) techMainImg.src = data.image;

      // Update Theme Color
      document.documentElement.style.setProperty("--theme-color", data.color);

      // Set active color option
      const colorOpts = document.querySelectorAll(".color-opt");
      colorOpts.forEach((opt) => {
        if (
          opt.dataset.color.toLowerCase() ===
          data.name.toLowerCase().split(" ")[0].toLowerCase()
        ) {
          opt.classList.add("active");
        } else {
          opt.classList.remove("active");
        }
      });
    }
  }

  // Call dynamic init at the start
  initDynamicModel();

  // ============================================
  // INTRO ANIMATION
  // ============================================
  const introOverlay = document.getElementById("intro-overlay");

  function hideIntro() {
    if (introOverlay) {
      setTimeout(() => {
        introOverlay.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 3000);
    }
  }

  document.body.style.overflow = "hidden";
  window.addEventListener("load", hideIntro);

  // ============================================
  // PARTICLE SYSTEM FOR HERO
  // ============================================
  const particlesContainer = document.getElementById("hero-particles");

  if (particlesContainer) {
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 15 + "s";
      particle.style.animationDuration = 10 + Math.random() * 10 + "s";
      particle.style.width = 2 + Math.random() * 4 + "px";
      particle.style.height = particle.style.width;
      particle.style.opacity = 0.2 + Math.random() * 0.3;
      particlesContainer.appendChild(particle);
    }
  }

  // ============================================
  // PARALLAX SCROLL EFFECTS
  // ============================================
  const parallaxElements = document.querySelectorAll(".parallax-circle");
  const heroImage = document.querySelector(".product-image");
  const heroGlow = document.querySelector(".hero-glow-orb");
  const whyBuildBg = document.querySelector(".why-build-bg-text");

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Use will-change optimization for transforms
    if (heroImage && scrollY < windowHeight) {
      heroImage.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0) scale(${1 - scrollY * 0.0002})`;
    }
    if (heroGlow && scrollY < windowHeight) {
      heroGlow.style.transform = `translate3d(-50%, -50%, 0) translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0003})`;
    }

    parallaxElements.forEach((el, i) => {
      const speed = 0.05 + i * 0.02;
      el.style.transform = `translate3d(0, ${scrollY * speed}px, 0) rotate(${scrollY * 0.02}deg)`;
    });

    if (whyBuildBg) {
      const whyBuildSection = document.querySelector(".why-build");
      if (whyBuildSection) {
        const rect = whyBuildSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          whyBuildBg.style.transform = `translate3d(${progress * 100 - 50}px, -50%, 0)`;
        }
      }
    }

    ticking = false;
  }

  // window.addEventListener(
  //   "scroll",
  //   () => {
  //     if (!ticking) {
  //       requestAnimationFrame(updateParallax);
  //       ticking = true;
  //     }
  //   },
  //   { passive: true },
  // );

  // ============================================
  // INTERSECTION OBSERVER - SCROLL ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stagger animation for spec cards
        if (entry.target.classList.contains("spec-card")) {
          const cards = document.querySelectorAll(".spec-card");
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.08}s`;
        }

        // Stagger animation for why features
        if (entry.target.classList.contains("why-feature")) {
          const features = document.querySelectorAll(".why-feature");
          const index = Array.from(features).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.15}s`;
        }

        // Stagger animation for related cards
        if (entry.target.classList.contains("related-card")) {
          const cards = document.querySelectorAll(".related-card");
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);

  // Observe elements
  document
    .querySelectorAll(
      ".section-header, .spec-card, .why-build-image, .why-build-content, .why-feature, .related-card, .tech-detail-card",
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // ============================================
  // 3D TILT EFFECT FOR SPEC CARDS
  // ============================================
  const specCards = document.querySelectorAll(".spec-card");

  specCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================
  const magneticBtns = document.querySelectorAll(".magnetic-btn");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // ============================================
  // COLOR SELECTOR
  // ============================================
  const colorOpts = document.querySelectorAll(".color-opt");
  const heroMoto = document.getElementById("hero-moto");
  const techMainImg = document.getElementById("tech-main-img");
  const sidebarImg = document.querySelector(".sidebar-product-img");
  const sidebarName = document.querySelector(".sidebar-product-name");
  const sidebarPrice = document.querySelector(".sidebar-total-price");

  const colorData = {
    red: {
      name: "Rosso Ducati",
      price: "$18,995",
      img: "./assets/red_moto.png",
      color: "#e30613",
    },
    yellow: {
      name: "Giallo Strada",
      price: "$19,495",
      img: "./assets/yellow.png",
      color: "#ffd700",
    },
    green: {
      name: "Verde Corse",
      price: "$18,995",
      img: "./assets/green_moto.png",
      color: "#006400",
    },
    white: {
      name: "Bianco Pulse",
      price: "$19,295",
      img: "./assets/white_moto.png",
      color: "#A49382",
    },
    bronze: {
      name: "Bronzo Veloce",
      price: "$19,995",
      img: "./assets/brown_moto.png",
      color: "#cf9800",
    },
  };

  colorOpts.forEach((opt) => {
    opt.addEventListener("click", () => {
      colorOpts.forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");

      const colorKey = opt.dataset.color;
      const data = colorData[colorKey];

      if (!data) return;

      // Update Theme
      document.documentElement.style.setProperty("--theme-color", data.color);

      // Animate main images
      if (heroMoto) {
        heroMoto.style.opacity = "0";
        heroMoto.style.transform = "scale(0.9) rotateY(10deg)";
        setTimeout(() => {
          heroMoto.src = data.img;
          heroMoto.style.opacity = "1";
          heroMoto.style.transform = "";
        }, 300);
      }

      if (techMainImg) {
        techMainImg.style.opacity = "0";
        setTimeout(() => {
          techMainImg.src = data.img;
          techMainImg.style.opacity = "1";
        }, 300);
      }

      // Update Sidebar
      if (sidebarImg) sidebarImg.src = data.img;
      if (sidebarName) sidebarName.textContent = data.name;
      if (sidebarPrice) sidebarPrice.textContent = data.price;

      // Update Hero Title and Price
      const productTitle = document.querySelector(".product-title");
      const productPrice = document.querySelector(".product-price");
      if (productTitle) productTitle.textContent = data.name;
      if (productPrice) productPrice.textContent = data.price;
    });
  });

  // ============================================
  // SIDEBAR / PRICING PANEL
  // ============================================
  const pricingBtn = document.getElementById("pricing-btn");
  const pricingBtnAlt = document.getElementById("pricing-btn-alt");
  const pricingSidebar = document.getElementById("pricing-sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarSearch = document.getElementById("sidebar-search");
  const sidebarSpecs = document.getElementById("sidebar-specs");

  function openSidebar() {
    pricingSidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    pricingSidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (pricingBtn) pricingBtn.addEventListener("click", openSidebar);
  if (pricingBtnAlt) pricingBtnAlt.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

  // Sidebar search
  if (sidebarSearch && sidebarSpecs) {
    sidebarSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const rows = sidebarSpecs.querySelectorAll(".sidebar-spec-row");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = "flex";
          row.style.opacity = "1";
        } else {
          row.style.display = "none";
          row.style.opacity = "0";
        }
      });
    });
  }

  // ============================================
  // PURCHASE MODAL
  // ============================================
  const shopNowBtn = document.getElementById("shop-now-btn");
  const sidebarShopBtn = document.getElementById("sidebar-shop-btn");
  const purchaseModal = document.getElementById("purchase-modal");
  const purchaseOverlay = document.getElementById("purchase-overlay");
  const purchaseClose = document.getElementById("purchase-close");
  const purchaseForm = document.getElementById("purchase-form");
  const purchaseSuccess = document.getElementById("purchase-success");

  function openPurchaseModal(e) {
    if (e) e.preventDefault();
    closeSidebar();
    purchaseModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePurchaseModal() {
    purchaseModal.classList.remove("active");
    document.body.style.overflow = "";

    // Reset form after animation
    setTimeout(() => {
      if (purchaseForm) purchaseForm.style.display = "flex";
      if (purchaseSuccess) purchaseSuccess.style.display = "none";
      if (purchaseForm) purchaseForm.reset();
    }, 500);
  }

  if (shopNowBtn) shopNowBtn.addEventListener("click", openPurchaseModal);
  if (sidebarShopBtn)
    sidebarShopBtn.addEventListener("click", openPurchaseModal);
  if (purchaseOverlay)
    purchaseOverlay.addEventListener("click", closePurchaseModal);
  if (purchaseClose)
    purchaseClose.addEventListener("click", closePurchaseModal);

  // Form submission
  if (purchaseForm) {
    purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate submission
      const submitBtn = purchaseForm.querySelector(".purchase-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<div class="spinner"></div>';
      submitBtn.disabled = true;

      setTimeout(() => {
        purchaseForm.style.display = "none";
        purchaseSuccess.style.display = "block";
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ============================================
  // TECH VIEW THUMBNAILS
  // ============================================
  const viewThumbs = document.querySelectorAll(".tech-view-thumb");

  viewThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      viewThumbs.forEach((t) => (t.style.borderColor = ""));
      thumb.style.borderColor = "var(--theme-color)";

      // Here you would swap the main image based on the view
      // For now, we'll just add a subtle animation
      if (techMainImg) {
        techMainImg.style.transform = "scale(0.95)";
        setTimeout(() => {
          techMainImg.style.transform = "";
        }, 300);
      }
    });
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector("nav");

  window.addEventListener(
    "scroll",
    () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    },
    { passive: true },
  );

  // ============================================
  // GLITCH TEXT EFFECT ON HOVER
  // ============================================
  const glitchText = document.querySelector(".glitch-text");

  if (glitchText) {
    glitchText.addEventListener("mouseenter", () => {
      glitchText.style.animation = "none";
      glitchText.offsetHeight; // Trigger reflow
      glitchText.style.animation = "";
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counterElements = document.querySelectorAll(".counter-value");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const duration = 2000;
          const start = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            el.textContent = "$" + current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counterElements.forEach((el) => counterObserver.observe(el));

  // ============================================
  // MOUSE PARALLAX FOR HERO
  // ============================================
  const heroSection = document.querySelector(".product-hero");

  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (heroMoto) {
        heroMoto.style.transform = `translateY(${y * 20}px) rotateY(${x * 10}deg) rotateX(${-y * 5}deg)`;
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      if (heroMoto) {
        heroMoto.style.transform = "";
      }
    });
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSidebar();
      closePurchaseModal();
    }
  });

  // ============================================
  // PRELOAD IMAGES
  // ============================================
  function preloadImages() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src) {
        const preloadImg = new Image();
        preloadImg.src = src;
      }
    });
  }

  preloadImages();

  // ============================================
  // PERFORMANCE: REDUCE MOTION
  // ============================================
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document
      .querySelectorAll(
        ".product-image, .spec-card, .parallax-circle, .particle",
      )
      .forEach((el) => {
        el.style.animation = "none";
        el.style.transition = "none";
      });
  }
})();
