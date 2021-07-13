// import { JwtStrategy, ExtractJwt } from 'passport-jwt';
// import path from 'path';
// import fs from 'fs';

// const __dirname = path.dirname();
// const pathToKey = path.join(__dirname, '..', 'keys', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// const initializePassport = (passport, getUserByEmail, getUserById) => {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email);
//     if (user == null) {
//       return done(null, false, { message: 'Invalid Email or Password.' });
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Invalid Email or Password.' });
//       }
//     } catch (err) {
//       return done(err);
//     }
//   };

//   const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: PUB_KEY,
//     algorithms: ['RS256'],
//   };
//   passport.use(
//     new JwtStrategy(
//       { usernameField: 'email', passwordField: 'password' },
//       authenticateUser
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user._id);
//   });
//   passport.deserializeUser((id, done) => {
//     done(null, getUserById(id));
//   });
// };

// export default initializePassport;
