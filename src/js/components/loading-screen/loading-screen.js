import { create } from '../../utils/dom.js';
import { i18n } from '../../core/i18n.js';

export function LoadingScreen({ minDuration = 1200 }) {
  const container = create('div', ['loading-screen'], { id: 'loading-screen' });
  const spinner = create('div', ['loading-spinner']);
  const text = create('p', ['loading-text'], { 'data-i18n': 'loading.message' });

  container.append(spinner, text);
  document.body.appendChild(container);

  const start = performance.now();

  return {
    container,
    async hide() {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);
      await new Promise(r => setTimeout(r, remaining));
      container.classList.add('is-hidden');
      await new Promise(r => setTimeout(r, 1200));
      container.remove();
    },
    updateText() {
      text.textContent = i18n.t('loading.message');
    }
  };
}
