import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { getElapsedSince } from '../../utils/date.js';

export function AnniversaryCounter({ year, month, day }) {
  const wrap = create('div', ['anniversary-counter']);
  const label = create('span', ['anniversary-counter__label'], { 'data-i18n': 'anniversaryCounter.label' });
  const value = create('span', ['anniversary-counter__value']);

  const render = () => {
    const { years, months, days } = getElapsedSince(year, month, day);
    const parts = [];
    if (years > 0) parts.push(`${years} ${i18n.t('anniversaryCounter.years')}`);
    if (months > 0) parts.push(`${months} ${i18n.t('anniversaryCounter.months')}`);
    parts.push(`${days} ${i18n.t('anniversaryCounter.days')}`);
    value.textContent = parts.join(' · ');
  };

  render();
  wrap.append(label, value);

  const unsubscribe = watchLanguage(render);

  return {
    container: wrap,
    destroy() {
      unsubscribe();
      wrap.remove();
    }
  };
}
