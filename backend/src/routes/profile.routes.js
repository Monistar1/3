import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';
import {
  getProfile,
  getProfileBySlug,
  createProfile,
  updateProfile,
  getFullProfile
} from '../controllers/profile.controller.js';

const router = Router();

const profileSchema = z.object({
  slug: z.string().min(2).max(64),
  partner1Name: z.string().min(1).max(100),
  partner2Name: z.string().min(1).max(100),
  weddingDate: z.string().datetime(),
  loveStory: z.string().max(5000).optional(),
  privateMode: z.boolean().default(false),
  privatePassPhrase: z.string().max(200).optional().nullable(),
  themeId: z.string().max(64).default('burgundy-gold')
});

router.get('/slug/:slug', getProfileBySlug);
router.get('/:id/full', getFullProfile);
router.get('/:id', getProfile);
router.post('/', requireAuth, validate(profileSchema), createProfile);
router.patch('/:id', requireAuth, validate(profileSchema.partial()), updateProfile);

export default router;
