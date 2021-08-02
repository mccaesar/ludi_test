"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getUserById = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../models/index.js"));

var router = _express["default"].Router();

var User = _index["default"].User;

var getUserById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.params.userId;
            _context.prev = 1;
            _context.next = 4;
            return User.findOne({
              _id: userId
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(401).send("No user with id: ".concat(userId)));

          case 7:
            res.status(200).send(user);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            res.status(404).send({
              message: _context.t0.message || "Some error occurred while retrieving user with id: ".concat(userId, ".")
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function getUserById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;
var _default = router;
exports["default"] = _default;