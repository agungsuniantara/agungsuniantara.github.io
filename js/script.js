document.addEventListener("DOMContentLoaded", function () {
  var fadeElements = document.querySelectorAll(".fade");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add("fade-in");
    });
  }

  var navToggle = document.querySelector(".nav__toggle");
  var navLinks = document.querySelector(".nav__links");

  function closeMenu() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        document.querySelectorAll(".nav__link").forEach(function (link) {
          link.classList.remove("active");
        });
        event.target.classList.add("active");
        closeMenu();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        navLinks.classList.contains("open") &&
        !navToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  var navSections = [
    document.getElementById("about"),
    document.getElementById("experience"),
    document.getElementById("education"),
    document.getElementById("projects"),
    document.getElementById("skills")
  ].filter(Boolean);
  var navLinkItems = document.querySelectorAll(".nav__link");

  function updateScrollSpy() {
    var scrollPosition = window.scrollY || window.pageYOffset;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var documentHeight = document.documentElement.scrollHeight;

    // 1. Top of page (Hero/Profile): deselect all nav links
    if (scrollPosition < 120) {
      navLinkItems.forEach(function (link) {
        link.classList.remove("active");
      });
      return;
    }

    // 2. Bottom of page: activate last section (skills)
    var isAtBottom = (windowHeight + Math.ceil(scrollPosition)) >= (documentHeight - 60);
    if (isAtBottom) {
      navLinkItems.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#skills");
      });
      return;
    }

    // 3. Focal line detection (upper 35% of viewport)
    var current = "";
    var focalLine = windowHeight * 0.35;

    navSections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= focalLine && rect.bottom >= 80) {
        current = section.getAttribute("id");
      }
    });

    // 4. Skills section detection (when it enters the main view)
    var skillsEl = document.getElementById("skills");
    if (skillsEl) {
      var skillsRect = skillsEl.getBoundingClientRect();
      if (skillsRect.top <= windowHeight * 0.55 && skillsRect.bottom >= 100) {
        current = "skills";
      }
    }

    navLinkItems.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", updateScrollSpy, { passive: true });
  window.addEventListener("resize", updateScrollSpy, { passive: true });
  updateScrollSpy();

  var themeToggle = document.querySelector(".theme-toggle");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage unavailable */
    }
  }

  if (themeToggle) {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");

    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Project Category Filter
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = this.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
          btn.setAttribute("aria-pressed", "false");
        });
        this.classList.add("active");
        this.setAttribute("aria-pressed", "true");

        projectCards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.classList.remove("is-hidden");
          } else {
            card.classList.add("is-hidden");
          }
        });
      });
    });
  }
});

