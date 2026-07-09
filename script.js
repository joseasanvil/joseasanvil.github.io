document.documentElement.classList.add("has-js");

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      rootMargin: "-40% 0px -52% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}

/*
 * Reveal contract:
 * Input: an element with data-reveal="up", "left", "right", or "fade".
 * Output: is-visible is added once when the element enters the viewport.
 * Reference: https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API
 */
const revealElements = [...document.querySelectorAll("[data-reveal]")];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  // Fallback: show all content when IntersectionObserver is unavailable.
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
