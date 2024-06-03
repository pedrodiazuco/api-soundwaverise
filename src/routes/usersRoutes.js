/*///////// IMPORTACIONES ////////*/
import express from "express";
import { getAllUsers } from "../controllers/usersController.js";
import { getOneUserByNickname } from "../controllers/usersController.js";
import { updateBioOneUser } from "../controllers/usersController.js";
import protect from '../middlewares/authMiddleware.js';

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
const router = express.Router();

/*///////// RUTAS DE LOS USUARIOS /api/users/ ////////*/
/*------ OBTENER TODOS LOS USUARIOS /api/users/ ------*/
router.get('/', getAllUsers);
/*------ OBTENER UN USUARIO POR EMAIL /api/users/:email ------*/
router.get('/:nickname', getOneUserByNickname);
/*------ ACTUALIZAR UN USUARIO /api/users/updateBioUser/:email ------*/
router.post('/updateBioUser/:id', protect, updateBioOneUser);


/*///////// EXPORTACIÓN RUTAS ////////*/
export default router;