import passport from 'passport';
import express from 'express';
import db from '../models/index.js';

const router = express.Router();

export const getCurrentUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).send({
        message: 'You are not authorized to retrieve user data.',
      });
    } else {
      res.status(200).send(user);
    }
  })(req, res, next);
};

export default router;
