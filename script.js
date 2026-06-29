// ============================================
// DUCATI PANIGALE V2 - POLISHED JS
// Hero Sound Engine + Full Functionality
// ============================================

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

// --- State Management ---
let heroMotionReady = false;
let heroTextSwapTimer = null;

// --- Hero Sound Engine (Mouse Sweep Detection) ---
const SoundEngine = {
  motoSound: null,
  previousX: 0,
  previousDirection: null, // 'left' or 'right'
  sweepCount: 0,
  isPlaying: false,
  soundTimeout: null,
  cooldown: false,
  cooldownTimer: null,
  heroSection: null,
  progressBar: null,
  progressDots: [],

  init() {
    this.motoSound = document.getElementById("moto-rev");
    this.heroSection = document.getElementById("hero");
    this.progressBar = document.getElementById("sound-progress-bar");
    this.progressDots = [
      document.getElementById("dot-1"),
      document.getElementById("dot-2"),
      document.getElementById("dot-3"),
      document.getElementById("dot-4"),
    ];

    if (!this.heroSection) return;

    // Mouse enter/leave hero
    this.heroSection.addEventListener("mouseenter", () => {
      document.getElementById("sound-progress").classList.add("visible");
    });

    this.heroSection.addEventListener("mouseleave", () => {
      document.getElementById("sound-progress").classList.remove("visible");
      this.reset();
    });

    // Mouse move on hero ONLY
    this.heroSection.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e);
    });
  },

  handleMouseMove(e) {
    const currentX = e.clientX;
    const direction = currentX > this.previousX ? "right" : "left";

    // Detect direction change (sweep)
    if (this.previousDirection && this.previousDirection !== direction) {
      // Direction changed! Count it as a sweep
      this.sweepCount++;
      this.updateProgress();

      // Check if 4 sweeps completed (4 direction changes = left-right-left-right)
      if (this.sweepCount >= 4) {
        this.triggerSound();
      }
    }

    this.previousDirection = direction;
    this.previousX = currentX;
  },

  updateProgress() {
    // Update progress bar
    if (this.progressBar) {
      this.progressBar.className = "sound-progress-bar";
      if (this.sweepCount >= 1) this.progressBar.classList.add("filled-1");
      if (this.sweepCount >= 2) this.progressBar.classList.add("filled-2");
      if (this.sweepCount >= 3) this.progressBar.classList.add("filled-3");
      if (this.sweepCount >= 4) this.progressBar.classList.add("filled-4");
    }

    // Update dots
    this.progressDots.forEach((dot, i) => {
      if (i < this.sweepCount) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  },

  triggerSound() {
    if (this.cooldown || this.isPlaying || !this.motoSound) return;

    this.isPlaying = true;
    this.cooldown = true;
    this.motoSound.currentTime = 0;

    this.motoSound.play().catch((err) => {
      console.log("Audio playback waiting for user interaction.");
      this.isPlaying = false;
      this.cooldown = false;
    });

    // Stop sound after 2 seconds (rev effect)
    this.soundTimeout = setTimeout(() => {
      if (this.motoSound) {
        this.motoSound.pause();
        this.motoSound.currentTime = 0;
      }
      this.isPlaying = false;
    }, 10000);

    // 5-second cooldown before next trigger
    this.cooldownTimer = setTimeout(() => {
      this.cooldown = false;
      this.sweepCount = 0;
      this.updateProgress();
    }, 5000);
  },

  reset() {
    this.sweepCount = 0;
    this.previousDirection = null;
    this.previousX = 0;
    this.updateProgress();

    if (this.soundTimeout) {
      clearTimeout(this.soundTimeout);
      this.soundTimeout = null;
    }
    if (this.cooldownTimer) {
      clearTimeout(this.cooldownTimer);
      this.cooldownTimer = null;
    }
    if (this.motoSound && this.isPlaying) {
      this.motoSound.pause();
      this.motoSound.currentTime = 0;
    }
    this.isPlaying = false;
    this.cooldown = false;
  },
};

// --- Hero Text Copy Swap ---
function applyHeroSelectionCopy(element) {
  const heroKicker = document.getElementById("hero-kicker");
  const heroOverline = document.getElementById("hero-overline");
  const heroCopyTitle = document.getElementById("hero-copy-title");
  const heroCopyBody = document.getElementById("hero-copy-body");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const leftPanel = document.getElementById("hero-copy-stack");
  const rightPanel = document.getElementById("hero-title-container");

  if (!leftPanel || !rightPanel) return;

  const nextHeroState = {
    kicker: element.dataset.heroKicker || "DUCATI COMPANY",
    overline: element.dataset.heroOverline || "The Land of Joy",
    title: element.dataset.heroTitle || "Rosso Ducati",
    copy:
      element.dataset.heroCopy || "Experience the peak of Italian engineering.",
    subtitle: element.dataset.heroSubtitle || "Lorem ipsum dolor sit amet.",
  };

  window.clearTimeout(heroTextSwapTimer);
  leftPanel.classList.add("is-changing");
  rightPanel.classList.add("is-changing");

  heroTextSwapTimer = window.setTimeout(() => {
    if (heroKicker) heroKicker.textContent = nextHeroState.kicker;
    if (heroOverline) heroOverline.textContent = nextHeroState.overline;
    if (heroCopyTitle) heroCopyTitle.textContent = nextHeroState.title;
    if (heroCopyBody) heroCopyBody.textContent = nextHeroState.copy;
    if (heroSubtitle) heroSubtitle.textContent = nextHeroState.subtitle;

    leftPanel.classList.remove("is-changing");
    rightPanel.classList.remove("is-changing");
  }, 180);
}

// --- Hero Parallax (ONLY inside hero) ---
function initHeroParallax() {
  const bikeTrack = document.getElementById("bike-track");
  const heroSection = document.getElementById("hero");

  if (!bikeTrack || !heroSection) return;

  heroSection.addEventListener("mousemove", (e) => {
    if (!heroMotionReady) return;
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    bikeTrack.style.transform = `translateX(${x}px)`;
  });
}

// --- Sticky Nav with Scroll Detection ---
function initStickyNav() {
  const nav = document.getElementById("main-nav");
  const hero = document.getElementById("hero");
  if (!nav || !hero) return;

  const heroBottom = hero.offsetTop + hero.offsetHeight;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    // Active nav link highlighting
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link");
  const scrollY = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

// --- Mobile Menu ---
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Close menu on link click
  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
}

// --- Search Functionality with Motorcycle Preview ---
const motorcycleDatabase = [
  {
    name: "Rosso Ducati",
    color: "Ducati Red",
    img: "./assets/red_moto.png",
    hex: "#E30613",
  },
  {
    name: "Giallo Strada",
    color: "Sunfire Yellow",
    img: "./assets/yellow.png",
    hex: "#FFD700",
  },
  {
    name: "Verde Corse",
    color: "Circuit Green",
    img: "./assets/green_moto.png",
    hex: "#006400",
  },
  {
    name: "Bianco Pulse",
    color: "Night White",
    img: "./assets/white_moto.png",
    hex: "#9F9180",
  },
  {
    name: "Bronzo Veloce",
    color: "Warm Bronze",
    img: "./assets/brown_moto.png",
    hex: "#cf9800",
  },
  {
    name: "Panigale V2",
    color: "Sport Bike",
    img: "./assets/red_moto.png",
    hex: "#E30613",
  },
  {
    name: "Ducati Red",
    color: "Classic",
    img: "./assets/red_moto.png",
    hex: "#E30613",
  },
  {
    name: "Scrambler",
    color: "Yellow",
    img: "./assets/yellow.png",
    hex: "#FFD700",
  },
  {
    name: "Monster",
    color: "Green",
    img: "./assets/green_moto.png",
    hex: "#006400",
  },
  {
    name: "Multistrada",
    color: "Adventure",
    img: "./assets/white_moto.png",
    hex: "#9F9180",
  },
];

function initSearch() {
  const searchTrigger = document.getElementById("search-trigger");
  const searchDropdown = document.getElementById("search-dropdown");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (!searchTrigger || !searchDropdown) return;

  // Toggle search dropdown
  searchTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    searchDropdown.classList.toggle("active");
    if (searchDropdown.classList.contains("active")) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      !searchDropdown.contains(e.target) &&
      !searchTrigger.contains(e.target)
    ) {
      searchDropdown.classList.remove("active");
    }
  });

  // Search input handler
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
      searchResults.innerHTML = "";
      return;
    }

    const matches = motorcycleDatabase.filter(
      (moto) =>
        moto.name.toLowerCase().includes(query) ||
        moto.color.toLowerCase().includes(query),
    );

    renderSearchResults(matches, query);
  });
}

function renderSearchResults(matches, query) {
  const searchResults = document.getElementById("search-results");

  if (matches.length === 0) {
    searchResults.innerHTML =
      '<div class="search-no-results">No motorcycles found matching "' +
      query +
      '"</div>';
    return;
  }

  searchResults.innerHTML = matches
    .map(
      (moto) => `
    <div class="search-result-item" onclick="selectMotoFromSearch('${moto.hex}', '${moto.img}', '${moto.name}')">
      <img src="${moto.img}" alt="${moto.name}" class="search-result-thumb">
      <div class="search-result-info">
        <span class="search-result-name">${moto.name}</span>
        <span class="search-result-color">${moto.color}</span>
      </div>
    </div>
  `,
    )
    .join("");
}

function selectMotoFromSearch(color, imgSrc, name) {
  // Find matching color option and trigger it
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    const onclick = option.getAttribute("onclick");
    if (onclick && onclick.includes(imgSrc)) {
      option.click();
    }
  });

  // Close search
  document.getElementById("search-dropdown").classList.remove("active");
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").innerHTML = "";

  // Scroll to hero
  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
}

// --- Color Master Switcher ---
function changeBikeColor(color, imgSrc, element) {
  // Update Carousel UI
  document
    .querySelectorAll(".color-option")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  const root = document.documentElement;
  const bikeImg = document.getElementById("bike-img");
  const specsBikeImg = document.getElementById("specs-bike-img");

  applyHeroSelectionCopy(element);

  // Professional transition: Fade + Small scale down
  [bikeImg, specsBikeImg].forEach((img) => {
    if (img) {
      img.style.opacity = "0";
      img.style.transform = "scale(0.95)";
    }
  });

  setTimeout(() => {
    root.style.setProperty("--theme-color", color);
    if (bikeImg) bikeImg.src = imgSrc;
    if (specsBikeImg) specsBikeImg.src = imgSrc;

    // Fade back in
    [bikeImg, specsBikeImg].forEach((img) => {
      if (img) {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      }
    });
  }, 300);
}

// --- Specs Section Animation ---
function updateSpec(index) {
  document.querySelectorAll(".spec-item-num").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  document.querySelectorAll(".spec-detail-card").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  const bike = document.getElementById("specs-bike-img");
  setTimeout(() => {
    if (index === 0) bike.style.transform = "scale(1) translateX(0)";
    if (index === 1) bike.style.transform = "scale(1.1) translateX(-20px)";
    if (index === 2) bike.style.transform = "scale(1.2) translateX(20px)";
    if (index === 3) bike.style.transform = "scale(1.1) translateY(-20px)";
  }, 50);
}

// --- Why It Matters Carousel Data ---
const motoData = [
  {
    title: "Bianco Pulse",
    prices: { original: "$7 000", full: "$8 000", standard: "$7 500" },
    img: "./assets/white_moto.png",
    bg: "bg-black",
    color: "#1a1a1a",
  },
  {
    title: "Giallo Strada",
    prices: { original: "$7 200", full: "$8 600", standard: "$8 200" },
    img: "./assets/yellow.png",
    bg: "bg-yellow",
    color: "#FFD700",
  },
  {
    title: "Verde Corse",
    prices: { original: "$8 000", full: "$9 000", standard: "$8 500" },
    img: "./assets/green_moto.png",
    bg: "bg-green",
    color: "#00873E",
  },
  {
    title: "Bronzo Veloce",
    prices: { original: "$8 500", full: "$9 500", standard: "$9 000" },
    img: "./assets/brown_moto.png",
    bg: "bg-brown",
    color: "#cf9800",
  },
  {
    title: "Rosso Ducati",
    prices: { original: "$9 000", full: "$8 400", standard: "$8 000" },
    img: "./assets/red_moto.png",
    bg: "bg-red",
    color: "#FF281B",
  },
];

// Page mapping for Shop Now links
const productPageMap = {
  "Bianco Pulse": "bianco-pulse.html",
  "Giallo Strada": "giallo-strada.html",
  "Verde Corse": "verde-corse.html",
  "Bronzo Veloce": "bronzo-veloce.html",
  "Rosso Ducati": "rosso-ducati.html",
};

let currentMotoIndex = 4; // Start with Rosso Ducati

function cycleMoto(direction) {
  const cards = document.querySelectorAll(".moto-card");
  const titleEl = document.getElementById("cta-title");
  const priceEls = document.querySelectorAll(".price-val");
  const shopBtn = document.querySelector(".shop-btn");
  const navCircles = document.querySelectorAll(".nav-circle");
  const tableHeader = document.querySelector(".table-header");

  let nextIndex =
    (currentMotoIndex + direction + motoData.length) % motoData.length;

  // 1. Smooth Transition: Fade out current active
  cards.forEach((card) => card.classList.remove("active"));

  // 2. Update the slots
  const prevIndex = (nextIndex - 1 + motoData.length) % motoData.length;

  // Update Slot 0 (Medium)
  const designPrev = motoData[prevIndex];
  if (cards[0]) {
    const imgEl = cards[0].querySelector(".moto-img");
    const bgEl = cards[0].querySelector(".moto-bg");
    if (imgEl) imgEl.src = designPrev.img;
    if (bgEl) bgEl.className = `moto-bg ${designPrev.bg}`;
  }

  // Update Slot 1 (Large/Active)
  const designNext = motoData[nextIndex];
  if (cards[1]) {
    const imgEl = cards[1].querySelector(".moto-img");
    const bgEl = cards[1].querySelector(".moto-bg");
    if (imgEl) imgEl.src = designNext.img;
    if (bgEl) bgEl.className = `moto-bg ${designNext.bg}`;
    cards[1].classList.add("active");
  }

  // 3. Dynamic Theme Updates
  const themeColor = designNext.color;

  if (titleEl) titleEl.textContent = designNext.title;
  if (titleEl) titleEl.style.color = themeColor;

  priceEls.forEach((el) => {
    const type = el.dataset.priceType;
    el.textContent = designNext.prices[type];
  });

  // Update Shop Now button link based on selected motorcycle
  const pageMap = {
    "Bianco Pulse": "bianco-pulse.html",
    "Giallo Strada": "giallo-strada.html",
    "Verde Corse": "verde-corse.html",
    "Bronzo Veloce": "bronzo-veloce.html",
    "Rosso Ducati": "rosso-ducati.html",
  };

  if (shopBtn) {
    shopBtn.style.backgroundColor = themeColor;
    const targetPage = pageMap[designNext.title];
    if (targetPage) {
      shopBtn.href = targetPage;
      shopBtn.setAttribute("data-current", designNext.title);
    }
  }

  navCircles.forEach((circle) => (circle.style.backgroundColor = themeColor));
  if (tableHeader) tableHeader.style.borderBottomColor = themeColor;

  currentMotoIndex = nextIndex;
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show success message
    const rightPanel = document.querySelector(".contact-right");
    rightPanel.innerHTML = `
      <div class="form-success">
        <div class="form-success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out, ${data.name}. Our team will get back to you shortly.</p>
      </div>
    `;

    // Reset after 4 seconds
    setTimeout(() => {
      rightPanel.innerHTML = `
        <form class="contact-form" id="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" required>
            </div>
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <select id="subject" name="subject">
              <option value="general">General Inquiry</option>
              <option value="test-ride">Test Ride Request</option>
              <option value="configure">Configure My Bike</option>
              <option value="dealer">Find a Dealer</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell us about your dream bike..." required></textarea>
          </div>
          <button type="submit" class="submit-btn">
            <span>Send Message</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </form>
      `;
      initContactForm();
    }, 4000);
  });
}

// --- Smooth Scroll for Anchor Links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// --- Intersection Observer for Scroll Animations ---
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".spec-detail-card, .contact-item, .table-row")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

// Add animation class styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);

// --- DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("hero-ready");

  // Initialize Hero Animation
  const bike = document.getElementById("bike");
  if (bike) {
    bike.addEventListener(
      "animationend",
      () => {
        heroMotionReady = true;
      },
      { once: true },
    );

    window.setTimeout(() => {
      heroMotionReady = true;
    }, 1600);
  } else {
    heroMotionReady = true;
  }

  // Initialize all modules
  SoundEngine.init();
  initHeroParallax();
  initStickyNav();
  initMobileMenu();
  initSearch();
  initContactForm();
  initSmoothScroll();
  initScrollAnimations();
});
