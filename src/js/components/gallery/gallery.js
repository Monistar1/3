import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { OBSERVED_CLASS } from '../../core/scroll-animations.js';

export function Gallery() {
  const section = create('section', ['gallery'], { id: 'gallery' });
  const header = create('div', ['gallery__header', 'container-narrow']);
  const pretitle = create('p', ['section-pretitle'], { 'data-i18n': 'gallery.sectionTitle' });
  const title = create('h2', ['section-title'], { 'data-i18n': 'gallery.sectionSubtitle' });
  header.append(pretitle, title);

  const grid = create('div', ['gallery__grid']);
  section.append(header, grid);

  const render = () => {
    const items = i18n.t('gallery.items');
    if (!Array.isArray(items)) return;

    grid.innerHTML = '';
    items.forEach((item, i) => {
      const frame = create('figure', ['gallery__frame', OBSERVED_CLASS]);
      frame.style.transitionDelay = `${i * 80}ms`;

      const img = create('img', [], {
        src: item.src,
        alt: item.caption || '',
        loading: 'lazy',
        decoding: 'async'
      });
      const caption = create('figcaption', ['gallery__caption']);
      caption.textContent = item.caption;

      frame.append(img, caption);
      grid.appendChild(frame);
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
