"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 8,
    max: 255
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    "default": Date.now
  }
}, {
  collection: 'users'
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;