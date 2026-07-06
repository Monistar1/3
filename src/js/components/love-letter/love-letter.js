import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { OBSERVED_CLASS } from '../../core/scroll-animations.js';

export function LoveLetter() {
  const section = create('section', ['love-letter'], { id: 'letter' });
  const header = create('div', ['love-letter__header', 'container-narrow']);
  const title = create('h2', ['section-title'], { 'data-i18n': 'letter.sectionTitle' });
  header.appendChild(title);

  const paper = create('div', ['love-letter__paper']);
  const content = create('div', ['love-letter__content']);
  paper.appendChild(content);
  section.append(header, paper);

  const render = () => {
    const letter = i18n.t('letter');
    if (!letter) return;

    content.innerHTML = '';

    const salutation = create('p', ['love-letter__salutation', OBSERVED_CLASS]);
    salutation.textContent = letter.salutation;
    salutation.style.transitionDelay = '0ms';

    const body = create('div', ['love-letter__body']);
    letter.paragraphs?.forEach((text, i) => {
      const p = create('p', [OBSERVED_CLASS]);
      p.textContent = text;
      p.style.transitionDelay = `${(i + 1) * 120}ms`;
      body.appendChild(p);
    });

    const signature = create('p', ['love-letter__signature', OBSERVED_CLASS]);
    signature.textContent = letter.signature;
    signature.style.transitionDelay = `${(letter.paragraphs?.length || 0 + 1) * 120}ms`;

    content.append(salutation, body, signature);
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
