"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _resourceController = require("../controllers/resource.controller.js");

var router = _express["default"].Router();

router.get('/resources', _resourceController.getResources); // router.get('/resource/:resourceId', getResourceByRID);

router.get('/resource/:resourceId/:userId', _resourceController.getResourceByRID);
router.get('/saved/:userId', _resourceController.getSavedResourceIds);
router.patch('/resource/:resourceId/save', _resourceController.saveResource);
router.patch('/resource/:resourceId/unsave', _resourceController.unsaveResource);
var _default = router;
exports["default"] = _default;