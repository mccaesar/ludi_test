"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var savedResourceSchema = _mongoose["default"].Schema({
  userId: {
    type: String,
    required: true
  },
  resourceIds: {
    type: Array,
    required: true
  }
}, {
  collection: 'savedresources'
});

var SavedResource = _mongoose["default"].model('SavedResource', savedResourceSchema);

var _default = SavedResource;
exports["default"] = _default;