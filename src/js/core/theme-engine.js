/**
 * Theme engine: loads theme CSS files dynamically and applies custom colors/fonts.
 */

const STORAGE_KEY = 'ever-after-theme';
const DEFAULT_THEME = 'burgundy-gold';
const THEMES = ['burgundy-gold', 'midnight-rose', 'ivory-garden'];

class ThemeEngine {
  constructor() {
    this.current = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    this.link = null;
  }

  async load(themeId) {
    if (!THEMES.includes(themeId)) themeId = DEFAULT_THEME;
    this.current = themeId;
    localStorage.setItem(STORAGE_KEY, themeId);

    if (this.link) this.link.remove();

    this.link = document.createElement('link');
    this.link.rel = 'stylesheet';
    this.link.href = `src/styles/themes/${themeId}.css`;
    document.head.appendChild(this.link);

    // Wait for stylesheet to apply so transitions feel correct.
    return new Promise(resolve => {
      this.link.onload = resolve;
      this.link.onerror = resolve;
    });
  }

  applyCustom(custom) {
    const root = document.documentElement;
    if (custom.primaryColor) root.style.setProperty('--color-bg-primary', custom.primaryColor);
    if (custom.accentColor) root.style.setProperty('--color-accent', custom.accentColor);
    if (custom.goldColor) root.style.setProperty('--color-gold', custom.goldColor);
    if (custom.serifFont) root.style.setProperty('--font-serif', custom.serifFont);
    if (custom.sansFont) root.style.setProperty('--font-sans', custom.sansFont);
    if (custom.arFont) root.style.setProperty('--font-ar', custom.arFont);
  }

  resetCustom() {
    const root = document.documentElement;
    [
      '--color-bg-primary',
      '--color-accent',
      '--color-gold',
      '--font-serif',
      '--font-sans',
      '--font-ar'
    ].forEach(prop => root.style.removeProperty(prop));
  }
}

export const themeEngine = new ThemeEngine();
export { THEMES, DEFAULT_THEME };
