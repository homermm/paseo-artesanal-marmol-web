(function () {
  var STATE_KEY = "__paseoNavigationInitialized__";

  if (window[STATE_KEY]) return;
  window[STATE_KEY] = true;

  var SECTIONS = ["inicio", "sobre", "artesanos", "participar", "contacto"];
  var HEADER_OFFSET = 110;

  function markActiveSection() {
    var scrollY = window.scrollY + HEADER_OFFSET + 1;
    var currentSection = "inicio";

    for (var i = SECTIONS.length - 1; i >= 0; i--) {
      var section = document.getElementById(SECTIONS[i]);
      if (section && section.offsetTop <= scrollY) {
        currentSection = SECTIONS[i];
        break;
      }
    }

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === currentSection) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  function initSmoothScroll() {
    document.addEventListener("click", function (event) {
      var anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      var targetId = anchor.getAttribute("href").slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();

      var targetPos = target.offsetTop - HEADER_OFFSET + 1;
      window.scrollTo({ top: targetPos, behavior: "smooth" });

      // Close mobile menu if open
      var navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        var bootstrapCollapse =
          window.bootstrap &&
          window.bootstrap.Collapse.getInstance(navbarCollapse);
        if (bootstrapCollapse) {
          bootstrapCollapse.hide();
        }
      }
    });
  }

  function init() {
    initSmoothScroll();
    markActiveSection();
    window.addEventListener("scroll", markActiveSection, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
