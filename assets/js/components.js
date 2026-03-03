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
          // En /pages/, reemplazar /assets/ y /pages/ por rutas relativas
          html = html
            .replace(/href="\/index\.html"/g, 'href="../index.html"')
            .replace(/href="\/pages\//g, 'href="./')
            .replace(/src="\/assets\//g, 'src="../assets/');
        } else {
          // En raíz, quitar el slash inicial
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

    // Navbar links
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
        // El link activo apunta a # para evitar recarga
        link.setAttribute("href", "#");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  // Cargar header → marcar nav activo
  loadComponent(
    "header-placeholder",
    "assets/components/header.html",
    function () {
      markActiveNav();
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
})();
