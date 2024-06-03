"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/authController.js");
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*///////// IMPORTACIONES ////////*/

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
var router = _express["default"].Router();

/*///////// RUTAS AUTH /api/tracks/ ////////*/
/*------ INICIAR SESION /api/auth/signIn ------*/
router.post('/signIn', _authController.signIn);
/*------ REGISTRO DE USUARIO /api/auth/signUp ------*/
router.post('/signUp', _authController.signUp);
/*------ OBTENER EL USUARIO DE LA SESIÓN POR SU TOKEN /api/auth/user ------*/
router.get('/user', _authMiddleware["default"], _authController.getUserByToken);
/*------ CIERRE DE SESIÓN /api/auth/signOut ------*/
router.post('/signOut', _authController.signOut);
var _default = exports["default"] = router;