/**
 * components.js
 * Inyecta el header y footer compartidos, y marca el link activo según la página actual.
 */
(function () {
  // Detecta si estamos en la raíz o en /pages/
  const isRoot = !window.location.pathname.includes("/pages/");
  const basePath = isRoot ? "" : "../";

  /**
   * Carga un componente HTML y lo inserta en el elemento destino.
   * Luego ejecuta el callback onLoad si se provee.
   */
  function loadComponent(placeholderId, componentPath, onLoad) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    fetch(basePath + componentPath)
      .then(function (res) {
        if (!res.ok) throw new Error("No se pudo cargar: " + componentPath);
        return res.text();
      })
      .then(function (html) {
        // Ajustar rutas relativas dentro del componente según la profundidad
        if (!isRoot) {
          html = html
            .replace(/href="\/index\.html"/g, 'href="../index.html"')
            .replace(/href="\/pages\//g, 'href="./')
            .replace(/src="\/assets\//g, 'src="../assets/');
        } else {
          html = html
            .replace(/href="\/index\.html"/g, 'href="./index.html"')
            .replace(/href="\/pages\//g, 'href="./pages/')
            .replace(/src="\/assets\//g, 'src="./assets/');
        }

        placeholder.outerHTML = html;

        if (typeof onLoad === "function") onLoad();
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  /**
   * Marca el link de navegación activo según la URL actual,
   * y ajusta aria-current="page".
   */
  function markActiveNav() {
    const path = window.location.pathname;
    let currentPage = "index";

    if (path.includes("sobre")) currentPage = "sobre";
    else if (path.includes("artesanos")) currentPage = "artesanos";
    else if (path.includes("participar")) currentPage = "participar";
    else if (path.includes("contacto")) currentPage = "contacto";

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
        link.setAttribute("href", "#");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  /**
   * Cierra el menú mobile de Bootstrap al hacer click en un nav-link.
   * Punto #19
   */
  function initMobileMenuClose() {
    document.addEventListener("click", function (e) {
      const navLink = e.target.closest(".navbar-collapse .nav-link");
      if (!navLink) return;

      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse =
          window.bootstrap &&
          window.bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  }

  /**
   * Back to Top button.
   * Punto #6
   */
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 400) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      },
      { passive: true },
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * Lazy-load del mapa con IntersectionObserver.
   * El iframe debe tener data-src en lugar de src.
   * Punto #22
   */
  function initLazyMap() {
    const mapIframes = document.querySelectorAll("iframe[data-src]");
    if (!mapIframes.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const iframe = entry.target;
              iframe.src = iframe.dataset.src;
              observer.unobserve(iframe);
            }
          });
        },
        { rootMargin: "200px" },
      );
      mapIframes.forEach(function (iframe) {
        observer.observe(iframe);
      });
    } else {
      // Fallback: cargar directamente
      mapIframes.forEach(function (iframe) {
        iframe.src = iframe.dataset.src;
      });
    }
  }

  // Cargar header → marcar nav activo → cerrar menú mobile
  loadComponent(
    "header-placeholder",
    "assets/components/header.html",
    function () {
      markActiveNav();
      initMobileMenuClose();
    },
  );

  // Cargar footer → marcar link activo en footer también
  loadComponent(
    "footer-placeholder",
    "assets/components/footer.html",
    function () {
      markActiveNav();
    },
  );

  // Inicializar funciones globales al cargar la página
  document.addEventListener("DOMContentLoaded", function () {
    initBackToTop();
    initLazyMap();
    initScrollReveal();
  });

  /**
   * Scroll Reveal — anima elementos .reveal al entrar en el viewport.
   */
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: mostrar todo directamente
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }
})();
