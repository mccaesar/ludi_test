import express from 'express';
import passport from 'passport';
import {google} from 'googleapis';
import initializePassport from '../config/passport.config.js';
import db from '../models/index.js';
import {
  validateRegistration,
  validateLogin,
  validateEmail, validateLoginByGoogle, validateGetGoogleUserInfo
} from '../validators/auth.validator.js';
import * as authUtils from '../utils/auth.util.js';
import { sendEmail } from '../service/email.service.js';
import { cipher, decipher } from '../service/crypto.service.js';
import logger from '../utils/logger.js';
import superagent from 'superagent';
const router = express.Router();
const { User } = db;
const redirect_uri = process.env.GOOGLE_REDIRECT_URL
if (process.env.NODE_ENV === 'production') {
  redirect_uri = process.env.GOOGLE_REDIRECT_URL_PRODUCTION
}

const buildLogContent = (req) => {
  const logContent = {
    metadata: {
      email: req.body.email,
      content: req.body.content,
      ip: req.socket.localAddress,
    }
  }
  return logContent
};

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

export const getGoogleLoginUrl = async (req, res, next) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        redirect_uri
    );
    const scopes = [
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];
    const authorizationUrl = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true
    });
    res.status(200).json({
      url: authorizationUrl
    });
  } catch (err) {
    logger.error('Some error occurred while registering user.', { ...logContent, action: 'register' });
  }
}

export const registerUser = async (req, res, next) => {
  // Validate user can be created from data
  const { isValid, errors: validationErrors } = validateRegistration(req.body);
  const logContent = buildLogContent(req);
  if (!isValid) {
    logger.error('Some error occurred while creating comment.', { ...logContent, action: 'create comment' })
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
      logger.error('Email Already in Use.', { ...logContent, action: 'Register' })
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
      screenName: req.body.screenName,
      email: req.body.email,
      affiliation: req.body.affiliation,
      title: req.body.title,
      passwordHash: passwordHash,
    });

  
    //Add user to the database
    await user.save();
    const jwt = authUtils.issueJWT(user);
    logger.info('successfully register user', { ...logContent, action: 'register' });
    res.status(201).send({
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } catch (err) {
    logger.error('Some error occurred while registering user.', { ...logContent, action: 'register' })
    res.status(404).send({
      message: err.message || 'Some error occurred while registering user.',
    });
  }


};

export const getGoogleUserInfo = async (req, res, next) => {
  const { isValid, errors: validationErrors } = validateGetGoogleUserInfo(req.body);
  if (!isValid) {
    return res.status(404).send({
      message: validationErrors
          ? validationErrors[0].message
          : 'Some error occurred while validating user information for login.',
    });
  }

  try {
    const {auth_code} = req.body;
    const googleResult = await superagent
        .post('https://oauth2.googleapis.com/token')
        .send({
          code: auth_code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_SECRET,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code"
        });
    const data = JSON.parse(googleResult.text);
    res.status(200).json(data);

  } catch (err) {
    console.log(err);
    logger.error('Some error occurred while get google info.', { action: 'get google info' })
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user in.',
    });
  }
}

export const logInByGoogle = async (req, res, next) => {
  const logContent = buildLogContent(req);

  const { isValid, errors: validationErrors } = validateLoginByGoogle(req.body);
  if (!isValid) {
    return res.status(404).send({
      message: validationErrors
          ? validationErrors[0].message
          : 'Some error occurred while validating user information for login.',
    });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).send({
        message: 'User not exist.',
      });
    }

    logger.info('successfully log in', { ...logContent, action: 'log in' });
    const tokenObj = authUtils.issueJWT(user);
    res.status(200).send({
      user: user,
      token: tokenObj.token,
      expiresIn: tokenObj.expires,
    });
  } catch (err) {
    logger.error('Some error occurred while log in.', { ...logContent, action: 'log in' })
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user in.',
    });
  }
};

export const logInUser = async (req, res, next) => {
  // Validate user can be created from data
  const logContent = buildLogContent(req);
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
      user.passwordHash
    );

    if (validPassword) {
      logger.info('successfully log in', { ...logContent, action: 'log in' });
      const tokenObj = authUtils.issueJWT(user);
      res.status(200).send({
        user: user,
        token: tokenObj.token,
        expiresIn: tokenObj.expires,
      });
    } else {
      logger.error('Invalid Email or Password.', { ...logContent, action: 'log in' })
      return res.status(404).send({
        message: 'Invalid Email or Password.',
      });
    }
  } catch (err) {
    logger.error('Some error occurred while log in.', { ...logContent, action: 'log in' })
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user in.',
    });
  }
};

export const logInUserGoogle = async (req, res, next) => {
  // Validate user can be created from data
  const logContent = buildLogContent(req);
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
      user.passwordHash
    );

    if (validPassword) {
      logger.info('successfully log in', { ...logContent, action: 'log in' });
      const tokenObj = authUtils.issueJWT(user);
      res.status(200).send({
        user: user,
        token: tokenObj.token,
        expiresIn: tokenObj.expires,
      });
    } else {
      logger.error('Invalid Email or Password.', { ...logContent, action: 'log in' })
      return res.status(404).send({
        message: 'Invalid Email or Password.',
      });
    }
  } catch (err) {
    logger.error('Some error occurred while log in.', { ...logContent, action: 'log in' })
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user in.',
    });
  }
};

export const logOutUser = async (req, res, next) => {
  const logContent = buildLogContent(req);
  try {
    console.log(req);
    req.logOut();
    logger.info('successfully log out', { ...logContent, action: 'log out' });
    res.send({ message: 'You are logged out.' });
  } catch (err) {
    logger.error('Some error occurred while logging out.', { ...logContent, action: 'log out' })
    res.status(404).send({
      message: err.message || 'Some error occurred while logging user out.',
    });
  }
};



// --------------- RESET PASSWORD ------------------------------

export const forgotPassword = async (req, res, next) => {
    // Verify email is in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: 'The user is not existed',
      });
    }

    let url = req.body.url +'/'+ cipher(user._id)
    const userObj = {
      url: url,
      name: user.screenName,
      email: user.email
    }
    sendEmail(userObj);
    res.status(200).send();
}


export const resetPassword = async (req, res, next) => {
  const passwordHash = await authUtils.encryptPassword(req.body.password);
  let id =  decipher(req.body.userId.id)
  let filter = { _id: id }
  let newPassword = {passwordHash : passwordHash}
  User.findOneAndUpdate(filter, newPassword, {upsert: true}, function(err, doc) {
    if (err) console.log("wrong")
  });
  res.status(200).send();
}


    
export default router;


