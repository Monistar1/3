import { env } from '../config/env.js';

export function notFound(_req, res) {
  res.status(404).json({ error: 'Resource not found' });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error('[Error]', err);

  res.status(status).json({
    error: message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
