"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTokenById = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// General imports

// Function to provide user token
var generateTokenById = exports.generateTokenById = function generateTokenById(userId) {
  console.log('GENERANDO TOKEN PARA EL ID: ' + userId);
  return _jsonwebtoken["default"].sign({
    id: userId
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};