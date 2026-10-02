---
title: Imperial Summons
hide:
  - navigation
  - toc
---

<div class="invitation-page" data-invitation>
  <a class="invitation-skip" href="world/">Enter without ceremony</a>

  <section class="invitation-stage" aria-labelledby="invitation-prompt">
    <p class="invitation-overline">Officium Imperiale Praedarorum</p>
    <p class="invitation-prompt" id="invitation-prompt">A dispatch has arrived under the seal of the Imperial Throne.</p>

    <div class="invitation-envelope-stage" data-envelope-stage>
      <div class="invitation-envelope">
        <div class="invitation-envelope__back" aria-hidden="true"></div>

        <div class="invitation-envelope__paper" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>

        <div class="invitation-envelope__flap" aria-hidden="true"></div>
        <div class="invitation-envelope__front" aria-hidden="true"></div>

        <button
          class="imperial-seal"
          type="button"
          data-open-invitation
          aria-expanded="false"
          aria-controls="imperial-letter"
        >
          <span class="imperial-seal__mark" aria-hidden="true">V</span>
          <span class="imperial-seal__label">Break the Imperial Seal</span>
        </button>
      </div>
    </div>

    <article
      class="imperial-letter"
      id="imperial-letter"
      data-letter
      tabindex="-1"
      aria-labelledby="imperial-letter-title"
    >
      <div class="imperial-letter__inner">
        <header class="imperial-letter__header">
          <p class="imperial-letter__authority">Under the authority of the Imperial Throne</p>
          <div class="imperial-letter__crest" aria-hidden="true"><span>V</span></div>
          <h1 id="imperial-letter-title">Imperial Notice of Summons</h1>
          <p class="imperial-letter__registry">Praedari Provisional Register · By sealed decree</p>
        </header>

        <div class="imperial-letter__body">
          <p class="imperial-letter__salutation">To the bearer of this notice,</p>

          <p>By examination and sworn witness, it has been determined that your body retains mana beyond the measure required for ordinary life. Your name has therefore been entered into the Provisional Register of Praedari.</p>

          <p>This distinction is rare. It is an honor, a responsibility, and a matter of Imperial interest.</p>

          <p>You are hereby summoned to present yourself before the nearest Chartered Academy or appointed Imperial examiner. There, your capacity will be measured, your discipline observed, and the path of your education determined.</p>

          <p>Until that assessment is complete, you are instructed neither to conceal your gift nor to demonstrate it without sanction. Bring this notice with you. Its seal is proof that the Throne has recognized what now stirs within you.</p>

          <blockquote class="imperial-letter__decree">
            The Empire does not leave power untaught.<br>
            It does not leave potential unused.
          </blockquote>

          <p>Come prepared to be tested. Come prepared to be changed. Come prepared to become more than nature first intended.</p>
        </div>

        <footer class="imperial-letter__footer">
          <div>
            <p>By mandate of the Throne,</p>
            <p class="imperial-letter__signature">The Office of Praedari Affairs</p>
          </div>
          <div class="imperial-letter__motto">
            <span>One law</span>
            <span>One civilization</span>
            <span>One future</span>
          </div>
        </footer>

        <a class="invitation-enter" href="world/">
          <span>Enter the Imperial Archives</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>

    <p class="invitation-status" data-invitation-status aria-live="polite"></p>
  </section>

  <button
    class="invitation-sound"
    type="button"
    data-sound-toggle
    aria-pressed="false"
    aria-label="Mute the paper sound"
  >
    <span aria-hidden="true">♪</span>
    <span data-sound-label>Sound on</span>
  </button>

  <audio data-letter-audio preload="auto">
    <source src="assets/audio/letter-opening.mp3" type="audio/mpeg">
  </audio>
</div>
