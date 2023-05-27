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
        .then((populatedUser) => res.status(200).send(populatedUser));
    }
  })(req, res, next);
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const users = await User.findOne({ _id: userId });
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while getting a single user by id.',
    });
  }
};

export const getProfessionalUsers = async (req, res, next) => {
  try {
    // const users = await User.find({'savedResources.2': {$exists: true}});
    const users = await User.aggregate(
      [
        {
          $match : { isFamousPeople : true } 
        },
        {$lookup:
          {
            from: 'resources',
            localField: 'favouriteResources',
            foreignField: '_id',
            as: 'favouriteResourcesPopulated'
          }
        }
      ]  
    );
    users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while getting all professional users.',
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while getting all users.',
    });
  }
};

export const getAllActiveUsers = async (req, res, next) => {
  try {
    // const users = await User.find({'savedResources.2': {$exists: true}});
    const users = await User.aggregate(
      [
        {
          $match: {'upvotedResources.2': {$exists: true}}
        },
        {$lookup:
          {
            from: 'resources',
            localField: 'upvotedResources',
            foreignField: '_id',
            as: 'upvotedResourcesPopulated'
          }
        }
      ]  
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while getting all active users.',
    });
  }
};





export default router;
