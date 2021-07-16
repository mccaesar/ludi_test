import express from 'express';
import passport from 'passport';

import initializePassport from '../config/passport.config.js';
import db from '../models/index.js';
import {
  validateRegistration,
  validateLogin,
} from '../validators/auth.validator.js';
import * as utils from '../lib/utils.js';

const router = express.Router();
const { User } = db;

initializePassport(passport);

export const registerUser = async (req, res, next) => {
  // Validate user can be created from data
  const { isValid, errors: validationErrors } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(401).send({
      message: validationErrors
        ? validationErrors[0].message
        : 'Some error occurred while validating user information for registration.',
    });
  }

  // Check if email is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(401).send({
      message: 'This email is already in use. Please use another one.',
    });
  }

  // Hash the password
  const saltHash = utils.encryptPassword(req.body.password);

  const passwordSalt = saltHash.salt;
  const passwordHash = saltHash.hash;

  // Create new User object
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    hash: passwordHash,
    salt: passwordSalt,
  });

  // Add user to the database
  try {
    const savedUser = await user.save();
    // res.status(200).send(savedUser);
    // res.redirect('/login');
    const jwt = utils.issueJWT(user);
    res.json({
      success: true,
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } catch (err) {
    // res.status(404).send({
    //   message: err.message || 'Some error occurred while registering user.',
    // });
    // res.redirect('/register');
    // res.json({ success: false, msg: err });
    next(err);
  }
};

export const logInUser = async (req, res, next) => {
  // Validate user can be created from data
  const { isValid, errors: validationErrors } = validateLogin(req.body);
  if (!isValid) {
    return res.status(401).send({
      message: validationErrors
        ? validationErrors[0].message
        : 'Some error occurred while validating user information for login.',
    });
  }

  // Verify email is in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send({
      message: 'Invalid Email or Password.',
    });
  }

  // Verify password is correct
  const validPassword = utils.validPassword(
    req.body.password,
    user.hash,
    user.salt
  );

  if (validPassword) {
    const tokenObj = utils.issueJWT(user);
    res.status(200).json({
      success: true,
      user: user,
      token: tokenObj.token,
      expiresIn: tokenObj.expires,
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Invalid Email or Password.',
    });
  }

  //   const authOptions = {
  //     successRedirect: '/',
  //     failureRedirect: '/login',
  //     failureFlash: true,
  //   };
  //   passport.authenticate('local', authOptions);
};

export const logOutUser = async (req, res) => {
  req.logOut();
  res.redirect('/');
};

export default router;
