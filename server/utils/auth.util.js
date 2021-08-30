import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import path from 'path';

const __dirname = path.resolve();
const pathToKey = path.join(__dirname, 'keys', 'id_rsa_priv.pem');
const PRIV_KEY = readFileSync(pathToKey, 'utf8');
const SALT_ROUNDS = 10;

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
export const validPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
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
export const encryptPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export const issueJWT = (user) => {
  const _id = user._id;

  const expiresIn = '30d';

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};
