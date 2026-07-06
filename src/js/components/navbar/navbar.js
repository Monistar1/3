import { create, on } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { scrollToSection } from '../../core/router.js';
import { LanguageSwitcher } from '../language-switcher/language-switcher.js';
import { MusicPlayer } from '../music-player/music-player.js';

export function Navbar({ coupleNames = [], musicFile }) {
  const nav = create('nav', ['navbar'], { id: 'navbar', 'aria-label': 'Main' });
  const brand = create('a', ['navbar__brand'], { href: '#hero' });
  brand.textContent = coupleNames.join(' & ') || 'Ever After';

  const menu = create('ul', ['navbar__menu']);
  const links = [
    { key: 'navbar.home', target: 'hero' },
    { key: 'navbar.memories', target: 'memories' },
    { key: 'navbar.gallery', target: 'gallery' },
    { key: 'navbar.letter', target: 'letter' },
    { key: 'navbar.countdown', target: 'countdown' }
  ];

  const linkEls = [];
  links.forEach(({ key, target }) => {
    const li = create('li');
    const a = create('a', ['navbar__link'], { href: `#${target}`, 'data-i18n': key });
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection(target);
      menu.classList.remove('is-open');
    });
    li.appendChild(a);
    menu.appendChild(li);
    linkEls.push(a);
  });

  const desktopControls = create('div', ['navbar__controls', 'navbar__desktop-controls']);
  const lang = LanguageSwitcher();
  const music = MusicPlayer({ musicFile });
  desktopControls.append(lang.container, music.container);

  const toggle = create('button', ['navbar__toggle'], { 'aria-label': 'Toggle menu' });
  toggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>`;
  toggle.addEventListener('click', () => menu.classList.toggle('is-open'));

  nav.append(brand, menu, desktopControls, toggle);

  const handleScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  const unsubscribe = watchLanguage(() => {
    linkEls.forEach((a, i) => {
      a.textContent = i18n.t(links[i].key);
    });
  });

  return {
    container: nav,
    destroy() {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      lang.destroy();
      music.destroy();
      nav.remove();
    }
  };
}
