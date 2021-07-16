import express from 'express';
import passport from 'passport'
import {
  registerUser,
  logInUser,
  logOutUser,
} from '../controllers/auth.controller.js';

const router = express.Router();

// export const authRedir = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };

// export const notAuthRedir = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   next();
// };

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({ success: true, msg: 'You are authorized' });
  }
);

router.post('/register', registerUser);
router.post('/login', logInUser);
router.delete('/logout', logOutUser);

export default router;
