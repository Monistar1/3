import { Router } from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.routes.js';
import uploadRoutes from './upload.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profiles', profileRoutes);
router.use('/uploads', uploadRoutes);

export default router;
