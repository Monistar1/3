import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { OBSERVED_CLASS } from '../../core/scroll-animations.js';

export function Closing() {
  const section = create('section', ['closing'], { id: 'closing' });
  const line = create('p', ['closing__line', OBSERVED_CLASS], { 'data-i18n': 'closing.text' });
  section.appendChild(line);

  const unsubscribe = watchLanguage(() => {
    line.textContent = i18n.t('closing.text');
  });

  return {
    container: section,
    destroy() {
      unsubscribe();
      section.remove();
    }
  };
}
