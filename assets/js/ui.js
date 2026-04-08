(function () {
  var STATE_KEY = "__paseoUiInitialized__";

  if (window[STATE_KEY]) return;
  window[STATE_KEY] = true;

  function initBackToTop() {
    var button = document.getElementById("back-to-top");
    if (!button) return;

    function updateVisibility() {
      if (window.scrollY > 400) {
        button.classList.add("visible");
      } else {
        button.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    updateVisibility();
  }

  function initLazyMap() {
    var mapIframes = document.querySelectorAll("iframe[data-src]");
    if (!mapIframes.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            var iframe = entry.target;
            iframe.src = iframe.dataset.src;
            observer.unobserve(iframe);
          });
        },
        { rootMargin: "200px" },
      );

      mapIframes.forEach(function (iframe) {
        observer.observe(iframe);
      });
    } else {
      mapIframes.forEach(function (iframe) {
        iframe.src = iframe.dataset.src;
      });
    }
  }

  function initScrollReveal() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
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

      reveals.forEach(function (element) {
        observer.observe(element);
      });
    } else {
      reveals.forEach(function (element) {
        element.classList.add("is-visible");
      });
    }
  }

  function initUi() {
    initBackToTop();
    initLazyMap();
    initScrollReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUi, { once: true });
  } else {
    initUi();
  }
})();
