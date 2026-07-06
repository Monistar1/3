/**
 * Wedding profile configuration.
 * This is the single client customization file.
 */

export const CONFIG = {
  // Couple information
  coupleNames: ['Layla', 'Omar'],

  // Anniversary date used for countdown and counter
  anniversaryDate: {
    year: 2018,
    month: 6,
    day: 15
  },

  // Optional ambient music file (WAV, MP3, OGG)
  musicFile: 'assets/music/ambient-romantic.wav',

  // Optional romantic video file (MP4, WebM)
  videoFile: 'assets/videos/our-story.mp4',
  videoPoster: 'assets/images/video-poster.svg',

  // Private mode: set to a phrase to require it, or null to disable
  privateModePassPhrase: null,

  // Theme selection (must match src/styles/themes/{id}.css)
  theme: 'burgundy-gold',

  // Section visibility
  sections: {
    hero: true,
    anniversaryCounter: true,
    memories: true,
    gallery: true,
    videos: true,
    letter: true,
    countdown: true,
    closing: true,
    footer: true
  }
};
