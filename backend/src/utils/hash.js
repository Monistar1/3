import crypto from 'crypto';

export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function randomToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}
