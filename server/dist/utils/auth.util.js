"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.issueJWT = exports.encryptPassword = exports.validPassword = void 0;

var _crypto = require("crypto");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _dirname = _path["default"].resolve();

var pathToKey = _path["default"].join(_dirname, 'keys', 'id_rsa_priv.pem');

var PRIV_KEY = (0, _fs.readFileSync)(pathToKey, 'utf8');
/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */

var validPassword = function validPassword(password, hash, salt) {
  var hashVerify = (0, _crypto.pbkdf2Sync)(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};
/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */


exports.validPassword = validPassword;

var encryptPassword = function encryptPassword(password) {
  var salt = (0, _crypto.randomBytes)(32).toString('hex');
  var genHash = (0, _crypto.pbkdf2Sync)(password, salt, 10000, 64, 'sha512').toString('hex');
  return {
    salt: salt,
    hash: genHash
  };
};
/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */


exports.encryptPassword = encryptPassword;

var issueJWT = function issueJWT(user) {
  var _id = user._id;
  var expiresIn = '30d';
  var payload = {
    sub: _id,
    iat: Date.now()
  };

  var signedToken = _jsonwebtoken["default"].sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256'
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  };
};

exports.issueJWT = issueJWT;