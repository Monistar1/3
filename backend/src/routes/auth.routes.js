import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';

const router = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);

export default router;
