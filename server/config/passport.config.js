import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';

import path from 'path';
import fs from 'fs';

import db from '../models/index.js';

const __dirname = path.resolve();
const pathToKey = path.join(__dirname, 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const { User } = db;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const initializePassport = (passport) => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      User.findOne({ _id: payload.sub })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid Email or Password.' });
          }
        })
        .catch((err) => done(err, false));
    })
  );
};

export default initializePassport;
