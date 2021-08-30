import express from 'express';
import passport from 'passport';

import initializePassport from '../config/passport.config.js';
import db from '../models/index.js';
import {
  validateRegistration,
  validateLogin,
} from '../validators/auth.validator.js';
import * as authUtils from '../utils/auth.util.js';

const router = express.Router();
const { User } = db;

initializePassport(passport);

export const userAuthorized = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(401).send({
        message: 'You are not logged in.',
      });
    } else {
      res.status(200).send({ message: 'You are logged in' });
    }
  })(req, res, next);
};

export const registerUser = async (req, res, next) => {
  // Validate user can be created from data
  const { isValid, errors: validationErrors } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(404).send({
      message: validationErrors
        ? validationErrors[0].message
        : 'Some error occurred while validating user information for registration.',
    });
  }

  try {
    // Check if email is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(404).send({
        message: 'This email is already in use. Please use another one.',
      });
    }

    // Hash the password
    const passwordHash = await authUtils.encryptPassword(req.body.password);

    // Create new User object
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hash: passwordHash,
    });

    // Add user to the database
    await user.save();
    const jwt = authUtils.issueJWT(user);
    res.status(201).send({
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while registering user.',
    });
  }
};

export const logInUser = async (req, res, next) => {
  // Validate user can be created from data
  const { isValid, errors: validationErrors } = validateLogin(req.body);
  if (!isValid) {
    return res.status(404).send({
      message: validationErrors
        ? validationErrors[0].message
        : 'Some error occurred while validating user information for login.',
    });
  }

  try {
    // Verify email is in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: 'Invalid Email or Password.',
      });
    }

    // Verify password is correct
    const validPassword = await authUtils.validPassword(
      req.body.password,
      user.hash
    );

    if (validPassword) {
      const tokenObj = authUtils.issueJWT(user);
      res.status(200).send({
        user: user,
        token: tokenObj.token,
        expiresIn: tokenObj.expires,
      });
    } else {
      return res.status(404).send({
        message: 'Invalid Email or Password.',
      });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user in.',
    });
  }
};

export const logOutUser = async (req, res, next) => {
  try {
    req.logOut();
    res.send({ message: 'You are logged out.' });
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user out.',
    });
  }
};

export default router;
