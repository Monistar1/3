import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';

export function MusicPlayer({ musicFile }) {
  const btn = create('button', ['music-player'], {
    'aria-label': i18n.t('music.play'),
    'aria-pressed': 'false'
  });
  btn.innerHTML = playIcon();

  if (!musicFile) {
    btn.classList.add('hidden');
    return { container: btn, destroy() { btn.remove(); } };
  }

  const audio = document.createElement('audio');
  audio.loop = true;
  audio.src = musicFile;
  audio.preload = 'none';
  document.body.appendChild(audio);

  let playing = false;

  const toggle = async () => {
    if (playing) {
      audio.pause();
      playing = false;
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', i18n.t('music.play'));
      btn.innerHTML = playIcon();
    } else {
      audio.volume = 0.35;
      try {
        await audio.play();
        playing = true;
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', i18n.t('music.pause'));
        btn.innerHTML = pauseIcon();
      } catch {
        playing = false;
      }
    }
  };

  btn.addEventListener('click', toggle);

  const unsubscribe = watchLanguage(() => {
    btn.setAttribute('aria-label', playing ? i18n.t('music.pause') : i18n.t('music.play'));
  });

  return {
    container: btn,
    destroy() {
      unsubscribe();
      audio.pause();
      audio.remove();
      btn.removeEventListener('click', toggle);
      btn.remove();
    }
  };
}

function playIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
}

function pauseIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
}
