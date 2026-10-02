(() => {
  "use strict";
  let cleanup = () => {};

  function initialiseInvitation() {
    cleanup();
    cleanup = () => {};
    const invitation = document.querySelector("[data-invitation]");
    document.body.classList.toggle("is-invitation-page", Boolean(invitation));

    if (!invitation || invitation.dataset.ready === "true") {
      return;
    }

    invitation.dataset.ready = "true";
    document.body.classList.add("is-invitation-page");

    const openButton = invitation.querySelector("[data-open-invitation]");
    const letter = invitation.querySelector("[data-letter]");
    const audio = invitation.querySelector("[data-letter-audio]");
    const soundToggle = invitation.querySelector("[data-sound-toggle]");
    const soundLabel = invitation.querySelector("[data-sound-label]");
    const status = invitation.querySelector("[data-invitation-status]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!openButton || !letter) {
      return;
    }

    let hasOpened = false;
    let openingTimer;
    cleanup = () => {
      window.clearTimeout(openingTimer);
      if (audio) audio.pause();
    };

    if (audio) {
      audio.volume = 0.36;
    }

    function updateSoundControl() {
      if (!audio || !soundToggle || !soundLabel) {
        return;
      }

      const isMuted = audio.muted;
      soundToggle.setAttribute("aria-pressed", String(isMuted));
      soundToggle.setAttribute(
        "aria-label",
        isMuted ? "Restore the paper sound" : "Mute the paper sound"
      );
      soundLabel.textContent = isMuted ? "Sound off" : "Sound on";
    }

    function revealLetter() {
      window.clearTimeout(openingTimer);
      invitation.classList.remove("is-opening");
      invitation.classList.add("is-open");

      if (status) {
        status.textContent = "The Imperial summons is open.";
      }

      window.requestAnimationFrame(() => {
        letter.focus({ preventScroll: true });
        window.scrollTo({
          top: 0,
          behavior: reduceMotion.matches ? "auto" : "smooth"
        });
      });
    }

    function openInvitation() {
      if (hasOpened) {
        return;
      }

      hasOpened = true;
      openButton.disabled = true;
      openButton.setAttribute("aria-expanded", "true");

      if (status) {
        status.textContent = "Breaking the seal and opening the letter.";
      }

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // The letter must still open if a browser blocks or cannot play audio.
        });
      }

      if (reduceMotion.matches) {
        revealLetter();
        return;
      }

      invitation.classList.add("is-opening");
      openingTimer = window.setTimeout(revealLetter, 3300);
    }

    openButton.addEventListener("click", openInvitation);

    if (soundToggle && audio) {
      soundToggle.addEventListener("click", () => {
        audio.muted = !audio.muted;
        updateSoundControl();
      });
      updateSoundControl();
    }
  }

  window.addEventListener("pagehide", () => cleanup());
  if (window.document$) {
    window.document$.subscribe(initialiseInvitation);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseInvitation, { once: true });
  } else {
    initialiseInvitation();
  }
})();
