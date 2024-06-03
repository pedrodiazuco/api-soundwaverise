"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _superAdminController = require("../controllers/superAdminController.js");
var _roles = require("../middlewares/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*///////// IMPORTACIONES ////////*/

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
var router = _express["default"].Router();

/*///////// RUTAS DEL USUARIO SUPER ADMINISTRADOR /api/superAdmin/ ////////*/
/*------ ELIMINAR UN USUARIO POR SU EMAIL /api/superAdmin/deleteUser/:email ------*/
router.post('/deleteUser/:nickname', _roles.isSuperAdmin, _superAdminController.deleteOneUser);
/*------ HACER A UN USUARIO ADMINISTRADOR /api/superAdmin/setSuperAdmin/:email ------*/
router.post('/setSuperAdmin/:nickname', _roles.isSuperAdmin, _superAdminController.setSuperAdminOneUser);

/*///////// EXPORTACIÓN RUTAS ////////*/
var _default = exports["default"] = router;