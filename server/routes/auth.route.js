import express from 'express';
import passport from 'passport';
import {
  userAuthorized,
  registerUser,
  logInUser,
  logOutUser,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/protected', userAuthorized);
router.post('/register', registerUser);
router.post('/login', logInUser);
router.delete(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  logOutUser
);



router.post('/password/reset', forgotPassword);
router.post('/password/reset/done', resetPassword);


export default router;
