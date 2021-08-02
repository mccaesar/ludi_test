"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _resourceRoute = _interopRequireDefault(require("./resource.route.js"));

var _authRoute = _interopRequireDefault(require("./auth.route.js"));

var _userRoute = _interopRequireDefault(require("./user.route.js"));

var router = _express["default"].Router();

router.use('/', _resourceRoute["default"]);
router.use('/', _authRoute["default"]);
router.use('/', _userRoute["default"]);
var _default = router;
exports["default"] = _default;