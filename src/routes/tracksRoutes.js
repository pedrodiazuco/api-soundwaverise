/*///////// IMPORTACIONES ////////*/
import express from "express";
import { getAllTracks } from "../controllers/tracksController.js";
import { getAllTrackskByUserId } from "../controllers/tracksController.js";
import { getOneTrackById } from "../controllers/tracksController.js";
import { createNewTrack } from "../controllers/tracksController.js";
import { deleteOneTrack } from "../controllers/tracksController.js";
import { updateOneTrack } from "../controllers/tracksController.js";
import { incrementPlaysOneTrack } from "../controllers/tracksController.js";
import { createNewLike } from "../controllers/tracksController.js";
import { checkIfUserHasLikedOneTrack } from "../controllers/tracksController.js";
import { createNewComment } from "../controllers/tracksController.js";
import { getAllCommentsByTrackId } from "../controllers/tracksController.js";
import { checkIfUserHasCommentedOneTrack } from "../controllers/tracksController.js";
import { downloadTrack } from "../controllers/tracksController.js";
import protect from '../middlewares/authMiddleware.js';


/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
const router = express.Router();

/*///////// RUTAS DE LOS TRACKS /api/tracks/ ////////*/
/*------ OBTENER TODOS LOS TRACKS ------*/
router.get('/', getAllTracks);
/*------ OBTENER LOS TRACKS DE UN USUARIO POR SU ID ------*/
router.get('/userTracks/:id', getAllTrackskByUserId);
/*------ OBTENER UN TRACK POR SU ID ------*/
router.get('/track/:id', getOneTrackById);
/*------ CREAR UN TRACK ------*/
router.post('/createTrack', protect, createNewTrack);
/*------ ELIMINAR UN TRACK POR SU ID ------*/
router.post('/deleteTrack/:id', protect, deleteOneTrack);
/*------ ACTUALIZAR UN TRACK POR SU ID ------*/
router.post('/updateTrack/:id', protect, updateOneTrack);
/*------ CREAR UN LIKE POR EL ID DEL TRACK ------*/
router.post('/incrementPlays/:id', incrementPlaysOneTrack);
/*------ CREAR UN LIKE POR EL ID DEL TRACK ------*/
router.post('/createLike/:id', protect, createNewLike);
/*------ CREAR UN COMENTARIO POR EL ID DEL TRACK ------*/
router.post('/createComment/:id', protect, createNewComment);
/*------ OBTENER LOS COMENTARIOS POR EL ID DEL TRACK ------*/
router.get('/comments/:id', getAllCommentsByTrackId);
/*------ COMPROBAR SI UN USUARIO HA DADO LIKE A UN TRACK ------*/
router.post('/userHasLiked/:id', protect, checkIfUserHasLikedOneTrack);
/*------ COMPROBAR SI UN USUARIO HA COMENTADO UN TRACK ------*/
router.post('/userHasCommented/:id', protect, checkIfUserHasCommentedOneTrack);
/*------ DESCARGAR UN TRACK ------*/
router.post('/download/:id', protect, downloadTrack);



/*///////// EXPORTACIÓN RUTAS ////////*/
export default router;