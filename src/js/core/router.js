/**
 * Minimal in-page smooth-scroll router.
 */

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function initHashLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    if (document.getElementById(id)) {
      e.preventDefault();
      scrollToSection(id);
    }
  });
}
