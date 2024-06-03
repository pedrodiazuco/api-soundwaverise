/*///////// IMPORTACIONES ////////*/
import express from "express";
import { signIn } from "../controllers/authController.js";
import { signUp } from "../controllers/authController.js";
import { getUserByToken } from "../controllers/authController.js";
import { signOut } from "../controllers/authController.js";
import protect from '../middlewares/authMiddleware.js';


/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
const router = express.Router();

/*///////// RUTAS AUTH /api/tracks/ ////////*/
/*------ INICIAR SESION /api/auth/signIn ------*/
router.post('/signIn', signIn);
/*------ REGISTRO DE USUARIO /api/auth/signUp ------*/
router.post('/signUp', signUp);
/*------ OBTENER EL USUARIO DE LA SESIÓN POR SU TOKEN /api/auth/user ------*/
router.get('/user', protect, getUserByToken)
/*------ CIERRE DE SESIÓN /api/auth/signOut ------*/
router.post('/signOut', signOut);




export default router;