"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _uploads = require("../middlewares/uploads.js");
var _uploadsController = require("../controllers/uploadsController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
var router = _express["default"].Router();

/*///////// RUTAS DE LOS UPLOADS /api/upload/ ////////*/
/*------ SUBIR UNA IMAGEN ------*/
/*Primero usa el middleware 'upload' para procesar el archivo recibido*/
/*Luego usa 'uploadToFirebase' para subir el archivo procesado a Firebase*/
/*------ SUBIR LA IMAGEN DEL USUARIO /api/upload/userImage ------*/
router.post('/userImage', _uploads.upload.single('image'), _uploadsController.uploadUserImageToFirebase);
/*------ SUBIR LA IMAGEN DEL USUARIO /api/upload/trackImage ------*/
router.post('/trackImage', _uploads.upload.single('image'), _uploadsController.uploadTrackImageToFirebase);
/*------ SUBIR LA IMAGEN DEL USUARIO /api/upload/trackAudio ------*/
router.post('/trackAudio', _uploads.upload.single('audio'), _uploadsController.uploadTrackAudioToFirebase);
var _default = exports["default"] = router;