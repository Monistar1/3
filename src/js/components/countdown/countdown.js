import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { getNextAnniversary, getTimeTo, pad } from '../../utils/date.js';

export function Countdown({ month, day }) {
  const section = create('section', ['countdown'], { id: 'countdown' });
  const inner = create('div', ['countdown__inner']);
  const pretitle = create('p', ['countdown__pretitle'], { 'data-i18n': 'countdown.pretitle' });
  const values = create('div', ['countdown__values']);

  const units = [
    { key: 'days', id: 'cd-days' },
    { key: 'hours', id: 'cd-hours' },
    { key: 'minutes', id: 'cd-minutes' },
    { key: 'seconds', id: 'cd-seconds' }
  ];

  const numberEls = {};

  const renderUnits = () => {
    values.innerHTML = '';
    units.forEach((unit, index) => {
      const wrap = create('div', ['countdown__unit']);
      const num = create('span', ['countdown__number'], { id: unit.id });
      num.textContent = '00';
      const label = create('span', ['countdown__label'], { 'data-i18n': `countdown.${unit.key}` });
      label.textContent = i18n.t(`countdown.${unit.key}`);

      wrap.append(num, label);
      values.appendChild(wrap);
      numberEls[unit.key] = num;

      if (index < units.length - 1) {
        const divider = create('span', ['countdown__divider'], { 'aria-hidden': 'true' });
        values.appendChild(divider);
      }
    });
  };

  renderUnits();
  inner.append(pretitle, values);
  section.appendChild(inner);

  let intervalId = null;

  const update = () => {
    const target = getNextAnniversary(month, day);
    const time = getTimeTo(target);

    Object.entries(time).forEach(([key, val]) => {
      const el = numberEls[key];
      if (!el) return;
      const str = pad(val);
      if (el.textContent !== str) {
        el.textContent = str;
        el.classList.add('is-changing');
        setTimeout(() => el.classList.remove('is-changing'), 900);
      }
    });
  };

  update();
  intervalId = setInterval(update, 1000);

  const unsubscribe = watchLanguage(() => {
    pretitle.textContent = i18n.t('countdown.pretitle');
    renderUnits();
    update();
  });

  return {
    container: section,
    destroy() {
      unsubscribe();
      clearInterval(intervalId);
      section.remove();
    }
  };
}
