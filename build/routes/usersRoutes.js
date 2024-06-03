"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _usersController = require("../controllers/usersController.js");
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*///////// IMPORTACIONES ////////*/

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
var router = _express["default"].Router();

/*///////// RUTAS DE LOS USUARIOS /api/users/ ////////*/
/*------ OBTENER TODOS LOS USUARIOS /api/users/ ------*/
router.get('/', _usersController.getAllUsers);
/*------ OBTENER UN USUARIO POR EMAIL /api/users/:email ------*/
router.get('/:nickname', _usersController.getOneUserByNickname);
/*------ ACTUALIZAR UN USUARIO /api/users/updateBioUser/:email ------*/
router.post('/updateBioUser/:id', _authMiddleware["default"], _usersController.updateBioOneUser);

/*///////// EXPORTACIÓN RUTAS ////////*/
var _default = exports["default"] = router;