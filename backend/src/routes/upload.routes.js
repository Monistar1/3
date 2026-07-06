import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { uploadImage } from '../controllers/upload.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/image', requireAuth, upload.single('image'), uploadImage);

export default router;
