(function () {
  var STATE_KEY = "__paseoNavigationInitialized__";

  if (window[STATE_KEY]) return;
  window[STATE_KEY] = true;

  function getCurrentPage() {
    var path = window.location.pathname.toLowerCase();

    if (path.indexOf("sobre") !== -1) return "sobre";
    if (path.indexOf("artesanos") !== -1) return "artesanos";
    if (path.indexOf("participar") !== -1) return "participar";
    if (path.indexOf("contacto") !== -1) return "contacto";

    return "index";
  }

  function markActiveNav() {
    var currentPage = getCurrentPage();

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  function initMobileMenuClose() {
    if (document.__paseoMobileMenuCloseBound) return;
    document.__paseoMobileMenuCloseBound = true;

    document.addEventListener("click", function (event) {
      var navLink = event.target.closest(".navbar-collapse .nav-link");
      if (!navLink) return;

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

  function syncNavigation() {
    markActiveNav();
    initMobileMenuClose();
  }

  document.addEventListener("DOMContentLoaded", syncNavigation);
  document.addEventListener("paseo:layout-updated", syncNavigation);
  syncNavigation();
})();
