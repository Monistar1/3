import { create } from '../../utils/dom.js';
import { i18n } from '../../core/i18n.js';

export function LanguageSwitcher() {
  const btn = create('button', ['language-switcher'], {
    'aria-label': 'Switch language',
    'data-i18n-attr': 'aria-label:language.switch'
  });
  btn.textContent = i18n.lang === 'en' ? 'AR' : 'EN';

  const handler = () => {
    i18n.toggle().then(() => {
      btn.textContent = i18n.lang === 'en' ? 'AR' : 'EN';
    });
  };

  btn.addEventListener('click', handler);

  return {
    container: btn,
    destroy() {
      btn.removeEventListener('click', handler);
      btn.remove();
    }
  };
}
