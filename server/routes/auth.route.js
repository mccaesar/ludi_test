import express from 'express';
import passport from 'passport';
import {
  userAuthorized,
  registerUser,
  logInUser,
  logOutUser,
  forgotPassword,
  resetPassword, logInByGoogle, getGoogleLoginUrl, getGoogleUserInfo
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/protected', userAuthorized);
router.post('/register', registerUser);
router.post('/login', logInUser);
router.post('/google-login', logInByGoogle);
router.get('/google-login', getGoogleLoginUrl);
router.post('/get-google-info', getGoogleUserInfo);
router.delete(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  logOutUser
);



router.post('/password/reset', forgotPassword);
router.post('/password/reset/done', resetPassword);


export default router;
