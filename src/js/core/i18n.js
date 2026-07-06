/**
 * Internationalization engine.
 * Loads locale JSON, switches document direction, exposes t() helper.
 */

import { prefersReducedMotion } from '../utils/dom.js';

const STORAGE_KEY = 'ever-after-lang';
const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'ar'];

class I18n {
  constructor() {
    this.lang = this.detectLanguage();
    this.cache = {};
    this.listeners = [];
  }

  detectLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(stored)) return stored;
    const browser = navigator.language?.slice(0, 2);
    if (SUPPORTED_LANGS.includes(browser)) return browser;
    return DEFAULT_LANG;
  }

  async load(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
    if (!this.cache[lang]) {
      const res = await fetch(`locales/${lang}.json`);
      if (!res.ok) throw new Error(`Failed to load locale ${lang}`);
      this.cache[lang] = await res.json();
    }
    this.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    this.applyDirection();
    this.notify();
    return this.cache[lang];
  }

  applyDirection() {
    const html = document.documentElement;
    html.setAttribute('lang', this.lang);
    html.setAttribute('dir', this.lang === 'ar' ? 'rtl' : 'ltr');
  }

  get(keyPath, vars = {}) {
    const data = this.cache[this.lang];
    if (!data) return keyPath;
    let value = keyPath.split('.').reduce((obj, key) => obj?.[key], data);
    if (value === undefined || value === null) return keyPath;
    if (typeof value === 'string') {
      return value.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
    }
    return value;
  }

  t(keyPath, vars) {
    return this.get(keyPath, vars);
  }

  onChange(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.lang, this.cache[this.lang]));
  }

  switch(lang) {
    return this.load(lang);
  }

  toggle() {
    return this.load(this.lang === 'en' ? 'ar' : 'en');
  }
}

export const i18n = new I18n();

/**
 * Translate all static [data-i18n] elements.
 */
export function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = i18n.t(key);
    if (text === key) return;
    if (el.tagName === 'TITLE') document.title = text;
    else el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
    const text = i18n.t(key);
    if (text !== key) el.setAttribute(attr, text);
  });
}

/**
 * Run a callback when language changes; optionally run immediately.
 */
export function watchLanguage(fn, immediate = true) {
  const unsubscribe = i18n.onChange(fn);
  if (immediate && i18n.cache[i18n.lang]) fn(i18n.lang, i18n.cache[i18n.lang]);
  return unsubscribe;
}
