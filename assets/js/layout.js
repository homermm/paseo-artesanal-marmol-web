(function () {
  var STATE_KEY = "__paseoLayoutInitialized__";
  var LAYOUT_EVENT = "paseo:layout-updated";

  if (window[STATE_KEY]) return;
  window[STATE_KEY] = true;

  function resolveUrl(path) {
    return new URL(path, document.baseURI).href;
  }

  function applyRootBindings(scope) {
    scope.querySelectorAll("[data-root-href]").forEach(function (element) {
      var rootHref = element.getAttribute("data-root-href");
      if (!rootHref) return;

      element.setAttribute("href", resolveUrl(rootHref));
    });

    scope.querySelectorAll("[data-root-src]").forEach(function (element) {
      var rootSrc = element.getAttribute("data-root-src");
      if (!rootSrc) return;

      element.setAttribute("src", resolveUrl(rootSrc));
    });
  }

  function notifyLayoutUpdated() {
    document.dispatchEvent(new CustomEvent(LAYOUT_EVENT));
  }

  function loadComponent(placeholderId, componentPath) {
    var placeholder = document.getElementById(placeholderId);
    if (!placeholder) return Promise.resolve(false);

    return fetch(resolveUrl(componentPath))
      .then(function (response) {
        if (!response.ok) {
          throw new Error("No se pudo cargar: " + componentPath);
        }

        return response.text();
      })
      .then(function (html) {
        placeholder.outerHTML = html;
        applyRootBindings(document);
        notifyLayoutUpdated();
        return true;
      })
      .catch(function (error) {
        console.error(error);
        return false;
      });
  }

  function initLayout() {
    loadComponent("header-placeholder", "assets/components/header.html");
    loadComponent("footer-placeholder", "assets/components/footer.html");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLayout, { once: true });
  } else {
    initLayout();
  }
})();
