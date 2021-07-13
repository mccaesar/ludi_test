// import express from 'express';
// import {
//   registerUser,
//   logInUser,
//   logOutUser,
// } from '../controllers/auth.controller.js';

// const router = express.Router();

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

// router.get('/protected', (req, res, next) => {});

// router.post('/register', registerUser);
// router.post('/login', logInUser);
// router.delete('/logout', logOutUser);

// export default router;
