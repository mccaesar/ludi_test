"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/user.controller.js");

var router = _express["default"].Router();

router.get('/user/:userId', _userController.getUserById);
var _default = router;
exports["default"] = _default;