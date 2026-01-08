import express from 'express';
import { home, search, category } from '../controllers/news.controller.js';
import newsRateLimiter from '../middleware/ratelimit.middleware.js';

const router = express.Router();
router.use(newsRateLimiter);

router.get('/', home);
router.get('/search', search);
router.get('/category/:category', category);

export default router;
