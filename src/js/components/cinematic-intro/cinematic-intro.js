import { create } from '../../utils/dom.js';
import { i18n } from '../../core/i18n.js';

export function CinematicIntro({ coupleNames, onEnter }) {
  const container = create('div', ['cinematic-intro'], { id: 'cinematic-intro' });
  const content = create('div', ['cinematic-intro__content']);
  const pretitle = create('p', ['cinematic-intro__pretitle'], { 'data-i18n': 'intro.pretitle' });

  const namesEl = create('h1', ['cinematic-intro__names']);
  const [name1, name2] = coupleNames || ['', ''];
  namesEl.innerHTML = `${escapeHtml(name1)} <span class="ampersand">&</span> ${escapeHtml(name2)}`;

  const button = create('button', ['cinematic-intro__button'], { 'data-i18n': 'intro.button' });

  content.append(pretitle, namesEl, button);
  container.appendChild(content);
  document.body.appendChild(container);

  const handler = () => {
    container.classList.add('is-hidden');
    setTimeout(() => container.remove(), 2600);
    if (onEnter) onEnter();
  };

  button.addEventListener('click', handler);

  return {
    container,
    destroy() {
      button.removeEventListener('click', handler);
      container.remove();
    },
    updateText() {
      pretitle.textContent = i18n.t('intro.pretitle');
      button.textContent = i18n.t('intro.button');
    }
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
