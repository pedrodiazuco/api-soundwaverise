"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var protect = function protect(req, res, next) {
  try {
    var token = req.cookies.token;
    console.log('TOKEN RECIBIDO EN PROTECT: ' + token);
    if (!token) {
      return res.status(401).json({
        message: "No autorizado, token no encontrado"
      });
    }
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Token inválido"
      });
    }
    console.log('TOKEN CORRECTO EN PROTECT');
    next();
  } catch (error) {
    console.error('Error verificando el token:', error);
    res.status(401).json({
      message: "No autorizado, token inválido"
    });
  }
};
var _default = exports["default"] = protect;