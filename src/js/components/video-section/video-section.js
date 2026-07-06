import { create } from '../../utils/dom.js';
import { i18n, watchLanguage } from '../../core/i18n.js';
import { OBSERVED_CLASS } from '../../core/scroll-animations.js';

export function VideoSection({ videoSrc, poster }) {
  const section = create('section', ['video-section'], { id: 'videos' });
  const header = create('div', ['video-section__header', 'container-narrow']);
  const pretitle = create('p', ['section-pretitle'], { 'data-i18n': 'videos.sectionTitle' });
  const title = create('h2', ['section-title'], { 'data-i18n': 'videos.sectionSubtitle' });
  header.append(pretitle, title);

  const frame = create('div', ['video-section__frame', OBSERVED_CLASS]);
  const video = create('video', ['video-section__video'], {
    src: videoSrc,
    poster: poster,
    controls: 'true',
    preload: 'metadata',
    'data-i18n-attr': 'aria-label:videos.ariaLabel'
  });
  video.setAttribute('aria-label', i18n.t('videos.ariaLabel'));

  const caption = create('p', ['video-section__caption'], { 'data-i18n': 'videos.caption' });

  frame.append(video, caption);
  section.append(header, frame);

  const unsubscribe = watchLanguage(() => {
    pretitle.textContent = i18n.t('videos.sectionTitle');
    title.textContent = i18n.t('videos.sectionSubtitle');
    caption.textContent = i18n.t('videos.caption');
    video.setAttribute('aria-label', i18n.t('videos.ariaLabel'));
  });

  return {
    container: section,
    destroy() {
      unsubscribe();
      section.remove();
    }
  };
}
