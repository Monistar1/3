/**
 * Scroll reveal engine using IntersectionObserver.
 * Respects reduced motion preferences.
 */

import { prefersReducedMotion } from '../utils/dom.js';

const OBSERVED_CLASS = 'observe-reveal';
const REVEALED_CLASS = 'is-revealed';

class ScrollAnimations {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.18;
    this.rootMargin = options.rootMargin || '0px 0px -60px 0px';
    this.observer = null;
  }

  init() {
    if (prefersReducedMotion()) {
      document.querySelectorAll(`.${OBSERVED_CLASS}`).forEach(el => {
        el.classList.add(REVEALED_CLASS);
      });
      return this;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(REVEALED_CLASS);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.threshold,
      rootMargin: this.rootMargin
    });

    this.observeAll();
    return this;
  }

  observeAll() {
    const unseen = document.querySelectorAll(`.${OBSERVED_CLASS}:not(.${REVEALED_CLASS})`);
    if (prefersReducedMotion()) {
      unseen.forEach(el => el.classList.add(REVEALED_CLASS));
      return;
    }
    if (!this.observer) return;
    unseen.forEach(el => this.observer.observe(el));
  }

  observe(elements) {
    const list = elements instanceof NodeList || Array.isArray(elements) ? elements : [elements];
    if (prefersReducedMotion()) {
      list.forEach(el => el.classList.add(REVEALED_CLASS));
      return;
    }
    if (!this.observer) return;
    list.forEach(el => this.observer.observe(el));
  }

  destroy() {
    this.observer?.disconnect();
    this.observer = null;
  }
}

export const scrollAnimations = new ScrollAnimations();
export { OBSERVED_CLASS, REVEALED_CLASS };
