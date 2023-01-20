import express from 'express';
import passport from 'passport';
import { getCurrentUser, getUserById, getAllUsers, getAllActiveUsers, getProfessionalUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);

router.get(
  '/user/:userId',
  getUserById
);

router.get(
  '/users',
  getAllUsers
);

router.get(
  '/active-users',
  getAllActiveUsers
);

router.get(
  '/professional-users',
  getProfessionalUsers
);

export default router;
