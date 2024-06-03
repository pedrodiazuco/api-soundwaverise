import express from 'express';
import { upload } from '../middlewares/uploads.js';
import { uploadUserImageToFirebase  } from '../controllers/uploadsController.js';
import { uploadTrackImageToFirebase  } from '../controllers/uploadsController.js';
import { uploadTrackAudioToFirebase  } from '../controllers/uploadsController.js';

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
const router = express.Router();

/*///////// RUTAS DE LOS UPLOADS /api/upload/ ////////*/
/*------ SUBIR UNA IMAGEN ------*/
/*Primero usa el middleware 'upload' para procesar el archivo recibido*/
/*Luego usa 'uploadToFirebase' para subir el archivo procesado a Firebase*/
/*------ SUBIR LA IMAGEN DEL USUARIO /api/upload/userImage ------*/
router.post('/userImage', upload.single('image'), uploadUserImageToFirebase);
/*------ SUBIR LA IMAGEN DEL USUARIO /api/upload/trackImage ------*/
router.post('/trackImage', upload.single('image'), uploadTrackImageToFirebase);
/*------ SUBIR LA IMAGEN DEL USUARIO /api/upload/trackAudio ------*/
router.post('/trackAudio', upload.single('audio'), uploadTrackAudioToFirebase);

export default router;