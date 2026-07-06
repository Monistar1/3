import { create } from '../../utils/dom.js';
import { i18n } from '../../core/i18n.js';

export function PrivateMode({ passPhrase, onUnlock }) {
  const container = create('div', ['private-mode'], { id: 'private-mode' });
  const card = create('div', ['private-mode__card']);
  const icon = create('div', ['private-mode__icon']);
  icon.innerHTML = lockSvg();

  const title = create('h2', ['private-mode__title'], { 'data-i18n': 'privateMode.title' });
  const subtitle = create('p', ['private-mode__subtitle'], { 'data-i18n': 'privateMode.subtitle' });
  const input = create('input', ['private-mode__input'], {
    type: 'password',
    'data-i18n-attr': 'placeholder:privateMode.placeholder'
  });
  input.placeholder = i18n.t('privateMode.placeholder');

  const error = create('p', ['private-mode__error'], { 'data-i18n': 'privateMode.error' });
  error.textContent = '';

  const button = create('button', ['private-mode__button'], { 'data-i18n': 'privateMode.button' });

  const check = () => {
    if (input.value.trim().toLowerCase() === String(passPhrase).toLowerCase()) {
      localStorage.setItem('ever-after-unlocked', '1');
      container.classList.add('is-hidden');
      setTimeout(() => container.remove(), 600);
      if (onUnlock) onUnlock();
    } else {
      error.textContent = i18n.t('privateMode.error');
      input.classList.add('is-error');
    }
  };

  button.addEventListener('click', check);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') check();
  });

  card.append(icon, title, subtitle, input, error, button);
  container.appendChild(card);
  document.body.appendChild(container);

  return {
    container,
    destroy() {
      container.remove();
    },
    updateText() {
      title.textContent = i18n.t('privateMode.title');
      subtitle.textContent = i18n.t('privateMode.subtitle');
      input.placeholder = i18n.t('privateMode.placeholder');
      button.textContent = i18n.t('privateMode.button');
    }
  };
}

function lockSvg() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
}
