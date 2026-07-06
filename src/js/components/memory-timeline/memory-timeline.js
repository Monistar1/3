import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { OBSERVED_CLASS } from '../../core/scroll-animations.js';

export function MemoryTimeline() {
  const section = create('section', ['memory-timeline'], { id: 'memories' });
  const header = create('div', ['memory-timeline__header', 'container-narrow']);
  const pretitle = create('p', ['section-pretitle'], { 'data-i18n': 'memories.sectionTitle' });
  const title = create('h2', ['section-title'], { 'data-i18n': 'memories.sectionSubtitle' });
  header.append(pretitle, title);

  const track = create('div', ['memory-timeline__track']);
  section.append(header, track);

  const render = () => {
    const items = i18n.t('memories.items');
    if (!Array.isArray(items)) return;

    track.innerHTML = '';
    items.forEach((item, i) => {
      const card = create('article', ['memory-card', OBSERVED_CLASS]);
      card.style.transitionDelay = `${i * 100}ms`;

      const date = create('span', ['memory-card__date']);
      date.textContent = item.date;
      const h3 = create('h3', ['memory-card__title']);
      h3.textContent = item.title;
      const p = create('p', ['memory-card__text']);
      p.textContent = item.text;

      card.append(date, h3, p);

      if (item.image) {
        const img = create('img', ['memory-card__image'], {
          src: item.image,
          alt: item.title,
          loading: 'lazy',
          decoding: 'async'
        });
        card.appendChild(img);
      }

      track.appendChild(card);
    });
  };

  render();
  const unsubscribe = watchLanguage(render);

  return {
    container: section,
    destroy() {
      unsubscribe();
      section.remove();
    }
  };
}
