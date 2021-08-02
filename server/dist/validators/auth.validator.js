"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLogin = exports.validateRegistration = void 0;

var _ajv = _interopRequireDefault(require("ajv"));

var _ajvFormats = _interopRequireDefault(require("ajv-formats"));

var ajv = new _ajv["default"]({
  allErrors: true
});
(0, _ajvFormats["default"])(ajv);

var validateRegistration = function validateRegistration(data) {
  var schema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 2,
        maxLength: 50
      },
      lastName: {
        type: 'string',
        minLength: 2,
        maxLength: 50
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 255
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 1023
      }
    },
    required: ['firstName', 'lastName', 'email', 'password'],
    additionalProperties: false
  };
  var validate = ajv.compile(schema);
  var isValid = validate(data);
  return {
    isValid: isValid,
    error: ajv.errors
  };
};

exports.validateRegistration = validateRegistration;

var validateLogin = function validateLogin(data) {
  var schema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        minLength: 6,
        maxLength: 255
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 1023
      }
    },
    required: ['email', 'password'],
    additionalProperties: false
  };
  var validate = ajv.compile(schema);
  var isValid = validate(data);
  return {
    isValid: isValid,
    error: ajv.errors
  };
};

exports.validateLogin = validateLogin;