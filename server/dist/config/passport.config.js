"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passportJwt = require("passport-jwt");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _index = _interopRequireDefault(require("../models/index.js"));

var _dirname = _path["default"].resolve();

var pathToKey = _path["default"].join(_dirname, 'keys', 'id_rsa_pub.pem');

var PUB_KEY = _fs["default"].readFileSync(pathToKey, 'utf8');

var User = _index["default"].User;
var options = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

var initializePassport = function initializePassport(passport) {
  passport.use(new _passportJwt.Strategy(options, function (payload, done) {
    User.findOne({
      _id: payload.sub
    }).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Invalid Email or Password.'
        });
      }
    })["catch"](function (err) {
      return done(err, null);
    });
  }));
};

var _default = initializePassport;
exports["default"] = _default;