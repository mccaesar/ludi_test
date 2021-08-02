"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _authController = require("../controllers/auth.controller.js");

var router = _express["default"].Router();

router.get('/protected', _authController.userAuthorized);
router.post('/register', _authController.registerUser);
router.post('/login', _authController.logInUser);
router["delete"]('/logout', _authController.logOutUser);
var _default = router;
exports["default"] = _default;