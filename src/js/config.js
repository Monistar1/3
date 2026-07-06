/**
 * Wedding profile configuration.
 * This is the single client customization file.
 * In production this can be replaced by an API call to /api/profile/:slug.
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

  // Optional ambient music
  musicFile: 'assets/music/ambient-romantic.mp3',

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
    letter: true,
    countdown: true,
    closing: true,
    footer: true
  },

  // Future backend integration
  apiBaseUrl: '',
  profileSlug: 'demo'
};
