import express from 'express';
import passport from 'passport';
import { getCurrentUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);

export default router;
