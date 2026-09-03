import { animate, inView, stagger } from "motion";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

const show = (el: HTMLElement) => {
  el.style.opacity = "1";
  el.style.transform = "none";
  el.dataset.revealed = "1";
};

function revealGroups() {
  // If motion can't help (reduced motion), just show everything.
  if (reduced.matches) {
    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
      .forEach(show);
    return;
  }

  const claimed = new WeakSet<Element>();

  document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    if (group.dataset.revealBound) return;
    const items = Array.from(
      group.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
    );
    if (!items.length) return;
    group.dataset.revealBound = "1";
    items.forEach((i) => claimed.add(i));
    inView(
      group,
      () => {
        items.forEach((i) => (i.dataset.revealed = "1"));
        animate(
          items,
          { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] },
          { duration: 0.7, delay: stagger(0.06), ease: [0.16, 1, 0.3, 1] },
        );
      },
      { amount: 0.12 },
    );
  });

  document
    .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
    .forEach((el) => {
      if (claimed.has(el) || el.dataset.revealBound) return;
      el.dataset.revealBound = "1";
      inView(
        el,
        () => {
          el.dataset.revealed = "1";
          animate(
            el,
            { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] },
            { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          );
        },
        { amount: 0.2 },
      );
    });
}

function magnetic() {
  if (reduced.matches || window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = "1";
    const strength = Number(el.dataset.magnetic) || 0.28;

    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      animate(el, { transform: `translate(${x}px, ${y}px)` }, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
    });
    el.addEventListener("pointerleave", () => {
      animate(el, { transform: "translate(0px, 0px)" }, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    });
  });
}

/** Safety net: nothing tagged [data-reveal] should ever stay invisible. */
function failsafe() {
  window.setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
      });
  }, 1200);
}

function setup() {
  revealGroups();
  magnetic();
  failsafe();
}

// Run now (covers the initial load even if we missed astro:page-load)…
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup, { once: true });
} else {
  setup();
}
// …and after every View Transition navigation.
document.addEventListener("astro:page-load", setup);
