import express from 'express';
import passport from 'passport';
import {
  userAuthorized,
  registerUser,
  logInUser,
  logOutUser,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/protected', userAuthorized);
router.post('/register', registerUser);
router.post('/login', logInUser);
router.delete('/logout', logOutUser);

export default router;
