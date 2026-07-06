import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    const err = new Error('Authentication required');
    err.status = 401;
    return next(err);
  }

  const token = header.slice(7);
  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    const err = new Error('Invalid or expired token');
    err.status = 401;
    next(err);
  }
}

export function requireOwnership(req, _res, next) {
  // Placeholder: implement profile ownership check via req.user.id
  next();
}
