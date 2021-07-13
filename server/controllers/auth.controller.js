// import express from 'express';
// import bcrypt from 'bcrypt';
// import passport from 'passport';

// import initializePassport from '../config/passport.config.js';
// import db from '../models/index.js';
// import {
//   validateRegistration,
//   validateLogin,
// } from '../validators/auth.validator.js';

// const router = express.Router();
// const { User } = db;

// export const getUserByEmail = async (userEmail) => {
//   const user = await User.findOne({ email: userEmail });
//   return user;
// };

// export const getUserById = async (id) => {
//   const user = await User.findOne({ _id: id });
//   return user;
// };

// initializePassport(passport, getUserByEmail, getUserById);

// export const registerUser = async (req, res) => {
//   // Validate user can be created from data
//   const { isValid, errors: validationErrors } = validateRegistration(req.body);
//   if (!isValid) {
//     return res.status(404).send({
//       message: validationErrors
//         ? validationErrors[0].message
//         : 'Some error occurred while validating user information for registration.',
//     });
//   }

//   // Check if email is already in the database
//   const emailExists = await User.findOne({ email: req.body.email });
//   if (emailExists) {
//     return res.status(404).send({
//       message: 'This email is already in use. Please use another one.',
//     });
//   }

//   // Hash the password
//   const salt = await bcrypt.genSalt(10);
//   const passwordHash = await bcrypt.hash(req.body.password, salt);

//   // Create new User object
//   const user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: passwordHash,
//   });

//   // Add user to the database
//   try {
//     const savedUser = await user.save();
//     // res.status(200).send(savedUser);
//     res.redirect('/login');
//   } catch (err) {
//     res.status(404).send({
//       message: err.message || 'Some error occurred while registering user.',
//     });
//     res.redirect('/register');
//   }
// };

// export const logInUser = async (req, res) => {
//   // Validate user can be created from data
//   const { isValid, errors: validationErrors } = validateLogin(req.body);
//   if (!isValid) {
//     return res.status(404).send({
//       message: validationErrors
//         ? validationErrors[0].message
//         : 'Some error occurred while validating user information for login.',
//     });
//   }

//   // Verify email is in database
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(404).send({
//       message: 'Invalid Email or Password.',
//     });
//   }

//   // Verify password is correct
//   const authOptions = {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//   };
//   passport.authenticate('local', authOptions);
// };

// export const logOutUser = async (req, res) => {
//   req.logOut();
//   res.redirect('/');
// };

// export default router;
