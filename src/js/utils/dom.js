/**
 * Lightweight DOM helpers used across components.
 */

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function create(tag, classes = [], attrs = {}) {
  const el = document.createElement(tag);
  if (classes.length) el.classList.add(...classes.filter(Boolean));
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'text') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else el.setAttribute(key, value);
  });
  return el;
}

export function removeAll(children) {
  children.forEach(c => c.remove());
}

export function on(el, event, handler, options) {
  el.addEventListener(event, handler, options);
  return () => el.removeEventListener(event, handler, options);
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
