// ============================================
// PRODUCT PAGE JS - DUCATI PANIGALE V2
// ============================================

const ProductPage = {
  init() {
    this.bindEvents();
    this.animateOnScroll();
  },

  bindEvents() {
    // Sidebar toggle
    const pricingBtn = document.getElementById("pricing-btn");
    const sidebar = document.getElementById("pricing-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const closeSidebar = document.getElementById("sidebar-close");

    if (pricingBtn && sidebar) {
      pricingBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }

    const closeSidebarFn = () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFn);
    if (overlay) overlay.addEventListener("click", closeSidebarFn);

    // Purchase modal
    const shopBtn = document.getElementById("shop-now-btn");
    const modal = document.getElementById("purchase-modal");
    const modalOverlay = document.getElementById("purchase-overlay");
    const closeModal = document.getElementById("purchase-close");

    if (shopBtn && modal) {
      shopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }

    const closeModalFn = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeModal) closeModal.addEventListener("click", closeModalFn);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModalFn);

    // Purchase form
    const form = document.getElementById("purchase-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = document.querySelector(".purchase-content");
        content.innerHTML = `
          <div class="purchase-success">
            <div class="purchase-success-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3>Order Submitted!</h3>
            <p>We'll contact you shortly to finalize your purchase.</p>
          </div>
        `;
        setTimeout(() => {
          closeModalFn();
          setTimeout(() => location.reload(), 300);
        }, 2500);
      });
    }

    // Color selector
    document.querySelectorAll(".color-opt").forEach((opt) => {
      opt.addEventListener("click", function () {
        document
          .querySelectorAll(".color-opt")
          .forEach((o) => o.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Sidebar search
    const searchInput = document.getElementById("sidebar-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll(".sidebar-spec-row").forEach((row) => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(term) ? "flex" : "none";
        });
      });
    }
  },

  animateOnScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".spec-card, .related-card, .why-feature")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
      });
  },
};

document.addEventListener("DOMContentLoaded", () => ProductPage.init());
