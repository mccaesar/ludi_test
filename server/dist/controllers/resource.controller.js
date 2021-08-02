"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.unsaveResource = exports.saveResource = exports.getSavedResourceIds = exports.getResourceByRID = exports.getResources = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../models/index.js"));

var router = _express["default"].Router();

var Resource = _index["default"].Resource,
    SavedResource = _index["default"].SavedResource,
    User = _index["default"].User;

var getResources = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var resources;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Resource.find();

          case 3:
            resources = _context.sent;
            res.status(200).send(resources);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(404).send({
              message: _context.t0.message || 'Some error occurred while retrieving resources.'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getResources(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // export const getResourceByRID = async (req, res) => {
//   try {
//     const resource = await Resource.findOne({
//       resourceId: req.params.resourceId,
//     });
//     res.status(200).send(resource);
//   } catch (err) {
//     res.status(404).send({
//       message:
//         err.message ||
//         `Some error occurred while retrieving resource with id: ${resourceId}.`,
//     });
//   }
// };


exports.getResources = getResources;

var getResourceByRID = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$params, resourceId, userId, resource, isSaved;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$params = req.params, resourceId = _req$params.resourceId, userId = _req$params.userId; // const { userId } = req.data;

            _context2.prev = 1;
            _context2.next = 4;
            return Resource.findOne({
              resourceId: resourceId
            });

          case 4:
            resource = _context2.sent;
            _context2.next = 7;
            return SavedResource.findOne({
              $and: [{
                userId: userId
              }, {
                resourceIds: {
                  $in: [resourceId]
                }
              }]
            });

          case 7:
            isSaved = !!_context2.sent;
            res.status(200).json({
              resource: resource,
              isSaved: isSaved
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            res.status(404).send({
              message: _context2.t0.message || "Some error occurred while retrieving resource with id: ".concat(resourceId, ".")
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function getResourceByRID(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getResourceByRID = getResourceByRID;

var getSavedResourceIds = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userId, savedResourceIds;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.params.userId;
            _context3.prev = 1;
            _context3.next = 4;
            return SavedResource.findOne({
              userId: userId
            });

          case 4:
            savedResourceIds = _context3.sent;
            res.status(200).send(savedResourceIds);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(404).send({
              message: _context3.t0.message || "Some error occurred while retrieving saved resources."
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function getSavedResourceIds(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getSavedResourceIds = getSavedResourceIds;

var saveResource = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var resourceId, userId, user, resource, savedResource;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            resourceId = req.params.resourceId;
            userId = req.body.userId;
            _context4.next = 4;
            return User.findOne({
              _id: userId
            });

          case 4:
            user = _context4.sent;

            if (user) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(401).send("No user with id: ".concat(userId)));

          case 7:
            _context4.next = 9;
            return Resource.findOne({
              resourceId: resourceId
            });

          case 9:
            resource = _context4.sent;

            if (resource) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(401).send("No resource with id: ".concat(resourceId)));

          case 12:
            _context4.next = 14;
            return SavedResource.updateOne({
              userId: userId
            }, {
              $set: {
                userId: userId
              },
              $addToSet: {
                resourceIds: resourceId
              }
            }, {
              upsert: true
            });

          case 14:
            savedResource = _context4.sent;

            if (!savedResource) {
              _context4.next = 18;
              break;
            }

            _context4.next = 18;
            return Resource.updateOne({
              resourceId: resourceId
            }, {
              $inc: {
                saveCount: 1
              }
            });

          case 18:
            res.status(200).json(savedResource);

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function saveResource(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.saveResource = saveResource;

var unsaveResource = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var resourceId, userId, user, resource, unsavedResource;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            resourceId = req.params.resourceId;
            userId = req.body.userId;
            _context5.next = 4;
            return User.findOne({
              _id: userId
            });

          case 4:
            user = _context5.sent;

            if (user) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(401).send("No user with id: ".concat(userId)));

          case 7:
            _context5.next = 9;
            return Resource.findOne({
              resourceId: resourceId
            });

          case 9:
            resource = _context5.sent;

            if (resource) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(401).send("No resource with id: ".concat(resourceId)));

          case 12:
            _context5.next = 14;
            return SavedResource.updateOne({
              userId: userId
            }, {
              $pull: {
                resourceIds: {
                  $in: [resourceId]
                }
              }
            });

          case 14:
            unsavedResource = _context5.sent;

            if (!unsavedResource) {
              _context5.next = 18;
              break;
            }

            _context5.next = 18;
            return Resource.updateOne({
              resourceId: resourceId
            }, {
              $inc: {
                saveCount: -1
              }
            });

          case 18:
            res.status(200).json(unsavedResource);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function unsaveResource(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.unsaveResource = unsaveResource;
var _default = router;
exports["default"] = _default;