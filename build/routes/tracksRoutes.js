"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _tracksController = require("../controllers/tracksController.js");
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*///////// IMPORTACIONES ////////*/

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
var router = _express["default"].Router();

/*///////// RUTAS DE LOS TRACKS /api/tracks/ ////////*/
/*------ OBTENER TODOS LOS TRACKS ------*/
router.get('/', _tracksController.getAllTracks);
/*------ OBTENER LOS TRACKS DE UN USUARIO POR SU ID ------*/
router.get('/userTracks/:id', _tracksController.getAllTrackskByUserId);
/*------ OBTENER UN TRACK POR SU ID ------*/
router.get('/track/:id', _tracksController.getOneTrackById);
/*------ CREAR UN TRACK ------*/
router.post('/createTrack', _authMiddleware["default"], _tracksController.createNewTrack);
/*------ ELIMINAR UN TRACK POR SU ID ------*/
router.post('/deleteTrack/:id', _authMiddleware["default"], _tracksController.deleteOneTrack);
/*------ ACTUALIZAR UN TRACK POR SU ID ------*/
router.post('/updateTrack/:id', _authMiddleware["default"], _tracksController.updateOneTrack);
/*------ CREAR UN LIKE POR EL ID DEL TRACK ------*/
router.post('/incrementPlays/:id', _tracksController.incrementPlaysOneTrack);
/*------ CREAR UN LIKE POR EL ID DEL TRACK ------*/
router.post('/createLike/:id', _authMiddleware["default"], _tracksController.createNewLike);
/*------ CREAR UN COMENTARIO POR EL ID DEL TRACK ------*/
router.post('/createComment/:id', _authMiddleware["default"], _tracksController.createNewComment);
/*------ OBTENER LOS COMENTARIOS POR EL ID DEL TRACK ------*/
router.get('/comments/:id', _tracksController.getAllCommentsByTrackId);
/*------ COMPROBAR SI UN USUARIO HA DADO LIKE A UN TRACK ------*/
router.post('/userHasLiked/:id', _authMiddleware["default"], _tracksController.checkIfUserHasLikedOneTrack);
/*------ COMPROBAR SI UN USUARIO HA COMENTADO UN TRACK ------*/
router.post('/userHasCommented/:id', _authMiddleware["default"], _tracksController.checkIfUserHasCommentedOneTrack);

/*///////// EXPORTACIÓN RUTAS ////////*/
var _default = exports["default"] = router;