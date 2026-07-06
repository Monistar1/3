import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
}));

// Static uploads
app.use('/uploads', express.static(env.UPLOAD_DIR));

// API routes
app.use('/api', routes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
