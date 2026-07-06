import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../models/prisma.js';

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const err = new Error('Email already registered');
      err.status = 409;
      throw err;
    }

    const hash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, passwordHash: hash },
      select: { id: true, email: true, createdAt: true }
    });

    res.status(201).json({ user, token: signToken(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    res.json({
      user: { id: user.id, email: user.email },
      token: signToken(user)
    });
  } catch (err) {
    next(err);
  }
}

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
}
