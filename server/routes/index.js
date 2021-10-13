import express from 'express';
import resourceRoutes from './resource.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import commentRoutes from './comment.route.js'

const router = express.Router();

router.use('/', resourceRoutes);
router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', commentRoutes);

export default router;
