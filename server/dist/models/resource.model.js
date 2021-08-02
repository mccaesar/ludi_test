"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var resourceSchema = _mongoose["default"].Schema({
  resourceId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  longDescription: String,
  url: {
    type: String,
    required: true
  },
  author: String,
  category: String,
  tags: String,
  isOpenSource: Boolean,
  dateAdded: {
    type: Date,
    required: true
  },
  saveCount: {
    type: Number,
    required: true
  }
}, {
  collection: 'resources'
});

var Resource = _mongoose["default"].model('Resource', resourceSchema);

var _default = Resource;
exports["default"] = _default;