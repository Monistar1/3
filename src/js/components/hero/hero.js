import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { OBSERVED_CLASS } from '../../core/scroll-animations.js';
import { scrollToSection } from '../../core/router.js';

export function Hero() {
  const section = create('section', ['hero'], { id: 'hero' });
  const inner = create('div', ['hero__inner', OBSERVED_CLASS]);
  const frame = create('div', ['hero__frame'], { 'aria-hidden': 'true' });
  const pretitle = create('p', ['hero__pretitle'], { 'data-i18n': 'hero.pretitle' });
  const title = create('h1', ['hero__title'], { 'data-i18n': 'hero.title' });
  const subtitle = create('p', ['hero__subtitle'], { 'data-i18n': 'hero.subtitle' });

  const scroll = create('button', ['hero__scroll']);
  scroll.innerHTML = `<span data-i18n="common.scroll">Scroll</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
  scroll.addEventListener('click', () => scrollToSection('memories'));

  inner.append(frame, pretitle, title, subtitle);
  section.append(inner, scroll);

  const unsubscribe = watchLanguage(() => {
    pretitle.textContent = i18n.t('hero.pretitle');
    title.textContent = i18n.t('hero.title');
    subtitle.textContent = i18n.t('hero.subtitle');
  });

  return {
    container: section,
    destroy() {
      unsubscribe();
      section.remove();
    }
  };
}
