"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//MULTER ES UN MIDDLEWARE PARA EXPRESS QUE SE UTILIZA PARA MANEJAR
//LOS DATOS DE FORMULARIOS 'multipart/form-data', QUE ES EL TIPO DE
//FORMULARIO QUE NECESITAS CUANDO QUIERES SUBIR ARCHIVOS DESDE EL NAVEGADOR

// Configuración del almacenamiento
var storage = _multer["default"].memoryStorage(); // Almacenamos los archivos en la memoria del servidor

// Filtro de archivo para validar si el archivo es una imagen o un archivo de audio
var fileFilter = function fileFilter(req, file, cb) {
  // Permite tipos de archivo específicos
  var allowedTypes = ['image/jpeg', 'audio/mp3'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG and MP3 are allowed.'));
  }
};

// Configuración simple de Multer para manejar la subida de archivos
var upload = exports.upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});