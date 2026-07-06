import { create } from '../../utils/dom.js';

export function AmbientOrbs() {
  const container = create('div', ['ambient-orbs'], { 'aria-hidden': 'true' });

  [1, 2, 3, 4].forEach(i => {
    const orb = create('div', ['ambient-orb', `ambient-orb--${i}`]);
    container.appendChild(orb);
  });

  document.body.appendChild(container);

  return {
    container,
    destroy() {
      container.remove();
    }
  };
}
