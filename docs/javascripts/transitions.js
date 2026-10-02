(() => {
  "use strict";

  // Material owns URLs, fetching, history, anchors, and failure recovery.
  if (!window.document$ || !window.location$) return;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentPath = location.pathname;
  let transition;
  let finishUpdate;
  let deadline;
  let pending = false;
  let ceremonial = false;

  function cancelTransition() {
    clearTimeout(deadline);
    finishUpdate?.();
    finishUpdate = undefined;
    transition?.skipTransition();
    transition = undefined;
  }

  window.location$.subscribe((url) => {
    if (url.pathname === currentPath) return;
    currentPath = url.pathname;
    cancelTransition();
    pending = true;
    ceremonial = document.body.classList.contains("is-invitation-page");
    root.classList.toggle("archive-ceremony", ceremonial);
    root.classList.add("archive-navigating");
    if (reducedMotion.matches || !document.startViewTransition) return;

    const update = new Promise((resolve) => { finishUpdate = resolve; });
    const active = document.startViewTransition(() => update);
    transition = active;
    // A slow request must never freeze the controls or hide the progress bar.
    deadline = setTimeout(cancelTransition, 700);
    active.ready.catch(() => {});
    active.finished.then(() => {
      if (transition === active) transition = undefined;
    }).catch(() => {});
  });

  window.document$.subscribe(() => {
    if (!pending) return;
    pending = false;
    clearTimeout(deadline);
    ceremonial = ceremonial || document.body.classList.contains("is-invitation-page");
    root.classList.toggle("archive-ceremony", ceremonial);
    const content = document.querySelector(".md-content");
    if (!reducedMotion.matches && !transition && content) {
      content.animate(
        [{ opacity: 0.35, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" }],
        { duration: ceremonial ? 550 : 250, easing: "ease-out" }
      );
    }
    finishUpdate?.();
    finishUpdate = undefined;
    // Keep smooth anchor scrolling, but make cross-page scroll restoration immediate.
    requestAnimationFrame(() => root.classList.remove("archive-navigating"));
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) cancelTransition();
  });
  window.addEventListener("pagehide", cancelTransition);
})();
