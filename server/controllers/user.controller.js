import passport from 'passport';
import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { User } = db;

export const getCurrentUser = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).send({
        message: 'You are not authorized to retrieve user data.',
      });
    } else {
      User.findOne({ _id: user._id })
        // .populate('savedResources', '_id index title category description')
        // .populate('upvotedResources', '_id index title category description')
        .then((populatedUser) => res.status(200).send(populatedUser));
    }
  })(req, res, next);
};

export default router;
