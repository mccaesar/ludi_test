"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logOutUser = exports.logInUser = exports.registerUser = exports.userAuthorized = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _passportConfig = _interopRequireDefault(require("../config/passport.config.js"));

var _index = _interopRequireDefault(require("../models/index.js"));

var _authValidator = require("../validators/auth.validator.js");

var authUtils = _interopRequireWildcard(require("../utils/auth.util.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();

var User = _index["default"].User;
(0, _passportConfig["default"])(_passport["default"]);

var userAuthorized = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _passport["default"].authenticate('jwt', {
              session: false
            }, function (err, user, info) {
              if (err || !user) {
                res.status(401).send({
                  success: false,
                  message: 'You are not logged in.'
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: 'You are logged in'
                });
              }
            })(req, res, next);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userAuthorized(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.userAuthorized = userAuthorized;

var registerUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _validateRegistration, isValid, validationErrors, emailExists, saltHash, passwordSalt, passwordHash, user, jwt;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Validate user can be created from data
            _validateRegistration = (0, _authValidator.validateRegistration)(req.body), isValid = _validateRegistration.isValid, validationErrors = _validateRegistration.errors;

            if (isValid) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              success: false,
              message: validationErrors ? validationErrors[0].message : 'Some error occurred while validating user information for registration.'
            }));

          case 3:
            _context2.next = 5;
            return User.findOne({
              email: req.body.email
            });

          case 5:
            emailExists = _context2.sent;

            if (!emailExists) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              success: false,
              message: 'This email is already in use. Please use another one.'
            }));

          case 8:
            // Hash the password
            saltHash = authUtils.encryptPassword(req.body.password);
            passwordSalt = saltHash.salt;
            passwordHash = saltHash.hash; // Create new User object

            user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              hash: passwordHash,
              salt: passwordSalt
            }); // Add user to the database

            _context2.prev = 12;
            _context2.next = 15;
            return user.save();

          case 15:
            jwt = authUtils.issueJWT(user);
            res.status(201).json({
              success: true,
              user: user,
              token: jwt.token,
              expiresIn: jwt.expires
            });
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](12);
            res.status(404).json({
              success: false,
              message: _context2.t0.message || 'Some error occurred while registering user.'
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 19]]);
  }));

  return function registerUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.registerUser = registerUser;

var logInUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _validateLogin, isValid, validationErrors, user, validPassword, tokenObj;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Validate user can be created from data
            _validateLogin = (0, _authValidator.validateLogin)(req.body), isValid = _validateLogin.isValid, validationErrors = _validateLogin.errors;

            if (isValid) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              message: validationErrors ? validationErrors[0].message : 'Some error occurred while validating user information for login.'
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return User.findOne({
              email: req.body.email
            });

          case 6:
            user = _context3.sent;

            if (user) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              message: 'Invalid Email or Password.'
            }));

          case 9:
            // Verify password is correct
            validPassword = authUtils.validPassword(req.body.password, user.hash, user.salt);

            if (!validPassword) {
              _context3.next = 15;
              break;
            }

            tokenObj = authUtils.issueJWT(user);
            res.status(200).json({
              success: true,
              user: user,
              token: tokenObj.token,
              expiresIn: tokenObj.expires
            });
            _context3.next = 16;
            break;

          case 15:
            return _context3.abrupt("return", res.status(401).json({
              success: false,
              message: 'Invalid Email or Password.'
            }));

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](3);
            res.status(404).json({
              success: false,
              message: _context3.t0.message || 'Some error occurred while logging user in.'
            });

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 18]]);
  }));

  return function logInUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.logInUser = logInUser;

var logOutUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            req.logOut();
            res.json({
              message: 'You are logged out.'
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function logOutUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.logOutUser = logOutUser;
var _default = router;
exports["default"] = _default;