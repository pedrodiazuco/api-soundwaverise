/*///////// IMPORTACIONES ////////*/
import express from "express";
import { deleteOneUser } from "../controllers/superAdminController.js";
import { setSuperAdminOneUser } from "../controllers/superAdminController.js";
import { isSuperAdmin } from "../middlewares/roles.js"

/*///////// MIDDLEWARE MANEJADOR DE RUTAS ////////*/
const router = express.Router();

/*///////// RUTAS DEL USUARIO SUPER ADMINISTRADOR /api/superAdmin/ ////////*/ 
/*------ ELIMINAR UN USUARIO POR SU EMAIL /api/superAdmin/deleteUser/:email ------*/
router.post('/deleteUser/:nickname', isSuperAdmin, deleteOneUser);
/*------ HACER A UN USUARIO ADMINISTRADOR /api/superAdmin/setSuperAdmin/:email ------*/
router.post('/setSuperAdmin/:nickname', isSuperAdmin, setSuperAdminOneUser);

/*///////// EXPORTACIÓN RUTAS ////////*/
export default router;