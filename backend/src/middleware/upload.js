import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { env } from '../config/env.js';

const allowedTypes = env.ALLOWED_IMAGE_TYPES.split(',');
const maxSize = env.MAX_FILE_SIZE_MB * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, env.UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const unique = crypto.randomBytes(12).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  }
});

const fileFilter = (_req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error(`Only ${allowedTypes.join(', ')} files are allowed`), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
});
