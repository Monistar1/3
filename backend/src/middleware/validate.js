import { z } from 'zod';

export function validate(schema) {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        const error = new Error(message);
        error.status = 400;
        return next(error);
      }
      next(err);
    }
  };
}
