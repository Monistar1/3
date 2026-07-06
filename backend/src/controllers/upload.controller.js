import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { env } from '../config/env.js';

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      const err = new Error('No image uploaded');
      err.status = 400;
      throw err;
    }

    const originalPath = req.file.path;
    const baseName = path.parse(req.file.filename).name;
    const outputName = `${baseName}.webp`;
    const outputPath = path.join(env.UPLOAD_DIR, outputName);

    await sharp(originalPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    // Remove original file after conversion.
    await fs.unlink(originalPath).catch(() => {});

    res.json({
      url: `/uploads/${outputName}`,
      originalName: req.file.originalname
    });
  } catch (err) {
    next(err);
  }
}
