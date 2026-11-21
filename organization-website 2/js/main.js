document.addEventListener("DOMContentLoaded", () => {
  const org = window.organization || {};
  const brandName = org.identity?.name || "[Organization Name]";
  const tagline = org.identity?.tagline || "[Organization Tagline]";

  document.querySelectorAll("[data-org-name]").forEach((element) => {
    element.textContent = brandName;
  });

  document.querySelectorAll("[data-org-tagline]").forEach((element) => {
    element.textContent = tagline;
  });

  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const counters = document.querySelectorAll(".stat-number");
  if (counters.length) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCounter = (element) => {
      const target = Number(element.dataset.target || 0);
      const duration = reducedMotion ? 0 : 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(progress * target);
        element.textContent = `${value}${target >= 1000 ? "+" : ""}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          element.textContent = `${target}${target >= 1000 ? "+" : ""}`;
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }
});
