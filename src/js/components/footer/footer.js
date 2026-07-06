import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';

export function Footer() {
  const footer = create('footer', ['footer']);
  const line = create('p', ['footer__line'], { 'data-i18n': 'footer.line' });
  footer.appendChild(line);

  const unsubscribe = watchLanguage(() => {
    line.textContent = i18n.t('footer.line');
  });

  return {
    container: footer,
    destroy() {
      unsubscribe();
      footer.remove();
    }
  };
}
