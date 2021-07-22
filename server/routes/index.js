import express from 'express';
import resourceRoutes from './resource.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';

const router = express.Router();

router.use('/', resourceRoutes);
router.use('/', authRoutes);
router.use('/', userRoutes);

export default router;
