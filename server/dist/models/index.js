"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));

var _resourceModel = _interopRequireDefault(require("./resource.model.js"));

var _savedresourcesModel = _interopRequireDefault(require("./savedresources.model.js"));

var _userModel = _interopRequireDefault(require("./user.model.js"));

var db = {
  mongoose: _mongoose["default"],
  url: _dbConfig["default"],
  Resource: _resourceModel["default"],
  SavedResource: _savedresourcesModel["default"],
  User: _userModel["default"]
};
var _default = db;
exports["default"] = _default;