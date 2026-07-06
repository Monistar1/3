import { prisma } from '../models/prisma.js';

export async function getProfile(req, res, next) {
  try {
    const profile = await prisma.weddingProfile.findUnique({
      where: { id: req.params.id }
    });
    if (!profile) {
      const err = new Error('Profile not found');
      err.status = 404;
      throw err;
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function getProfileBySlug(req, res, next) {
  try {
    const profile = await prisma.weddingProfile.findUnique({
      where: { slug: req.params.slug }
    });
    if (!profile) {
      const err = new Error('Profile not found');
      err.status = 404;
      throw err;
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function getFullProfile(req, res, next) {
  try {
    const profile = await prisma.weddingProfile.findUnique({
      where: { id: req.params.id },
      include: {
        memories: { orderBy: { order: 'asc' } },
        galleryItems: { orderBy: { order: 'asc' } },
        loveLetter: true,
        themeSettings: true,
        musicSettings: true,
        sections: true
      }
    });
    if (!profile) {
      const err = new Error('Profile not found');
      err.status = 404;
      throw err;
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function createProfile(req, res, next) {
  try {
    const profile = await prisma.weddingProfile.create({
      data: {
        ...req.body,
        ownerId: req.user.id
      }
    });
    res.status(201).json(profile);
  } catch (err) {
    if (err.code === 'P2002') {
      err.status = 409;
      err.message = 'Slug already in use';
    }
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const profile = await prisma.weddingProfile.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(profile);
  } catch (err) {
    if (err.code === 'P2025') {
      err.status = 404;
      err.message = 'Profile not found';
    }
    next(err);
  }
}
