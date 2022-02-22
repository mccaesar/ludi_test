import express from 'express';
import passport from 'passport';
import { getCurrentUser, getAllUsers, getAllActiveUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);

router.get(
  '/users',
  getAllUsers
);

router.get(
  '/active-users',
  getAllActiveUsers
);


export default router;
