/**
 * Ever After — Premium Wedding Anniversary Website
 * Orchestrates components, i18n, theme, and premium features.
 */

import { CONFIG } from './config.js';
import { i18n, translatePage, watchLanguage } from './core/i18n.js';
import { themeEngine } from './core/theme-engine.js';
import { scrollAnimations } from './core/scroll-animations.js';
import { initHashLinks } from './core/router.js';

import { LoadingScreen } from './components/loading-screen/loading-screen.js';
import { CinematicIntro } from './components/cinematic-intro/cinematic-intro.js';
import { PrivateMode } from './components/private-mode/private-mode.js';
import { AmbientCanvas } from './components/ambient-canvas/ambient-canvas.js';
import { Navbar } from './components/navbar/navbar.js';
import { Hero } from './components/hero/hero.js';
import { AnniversaryCounter } from './components/anniversary-counter/anniversary-counter.js';
import { MemoryTimeline } from './components/memory-timeline/memory-timeline.js';
import { Gallery } from './components/gallery/gallery.js';
import { LoveLetter } from './components/love-letter/love-letter.js';
import { Countdown } from './components/countdown/countdown.js';
import { Closing } from './components/closing/closing.js';
import { Footer } from './components/footer/footer.js';

const components = [];

async function init() {
  const loader = LoadingScreen({ minDuration: 1000 });

  // Load theme before anything else to avoid flash.
  await themeEngine.load(CONFIG.theme);

  // Load default or saved language.
  await i18n.load(i18n.lang);
  translatePage();

  // Ambient background.
  AmbientCanvas();

  // Private mode gate (if enabled and not already unlocked).
  const isUnlocked = localStorage.getItem('ever-after-unlocked') === '1';
  if (CONFIG.privateModePassPhrase && !isUnlocked) {
    PrivateMode({
      passPhrase: CONFIG.privateModePassPhrase,
      onUnlock: () => buildSite()
    });
  } else {
    buildSite();
  }

  // Intro overlay.
  if (CONFIG.sections.hero) {
    CinematicIntro({
      coupleNames: CONFIG.coupleNames,
      onEnter: () => {
        loader.hide();
        scrollAnimations.init().observeAll();
      }
    });
  } else {
    loader.hide();
    scrollAnimations.init().observeAll();
  }

  initHashLinks();

  // Re-translate static elements and re-observe after language changes.
  watchLanguage(() => {
    translatePage();
    scrollAnimations.observeAll();
  });
}

function buildSite() {
  const page = document.getElementById('page');
  if (!page) return;

  const { sections, anniversaryDate, musicFile, coupleNames } = CONFIG;

  const navbar = Navbar({ coupleNames, musicFile });
  document.body.insertBefore(navbar.container, page);
  components.push(navbar);

  if (sections.hero) {
    const hero = Hero();
    page.appendChild(hero.container);
    components.push(hero);

    if (sections.anniversaryCounter) {
      const counter = AnniversaryCounter(anniversaryDate);
      hero.container.querySelector('.hero__inner').appendChild(counter.container);
      components.push(counter);
    }
  }

  if (sections.memories) {
    const memories = MemoryTimeline();
    page.appendChild(memories.container);
    components.push(memories);
  }

  if (sections.gallery) {
    const gallery = Gallery();
    page.appendChild(gallery.container);
    components.push(gallery);
  }

  if (sections.letter) {
    const letter = LoveLetter();
    page.appendChild(letter.container);
    components.push(letter);
  }

  if (sections.countdown) {
    const countdown = Countdown(anniversaryDate);
    page.appendChild(countdown.container);
    components.push(countdown);
  }

  if (sections.closing) {
    const closing = Closing();
    page.appendChild(closing.container);
    components.push(closing);
  }

  if (sections.footer) {
    const footer = Footer();
    page.appendChild(footer.container);
    components.push(footer);
  }
}

init().catch(console.error);
