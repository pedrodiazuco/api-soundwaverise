/*----- MÉTODOS IMPORTADOS -----*/ 
import { deleteUserFromDatabase } from "../models/superAdminModel.js";
import { setSuperAdminOneUserIntoDatabase } from '../models/superAdminModel.js';
/*///////// IMPORTACIONES EXTERNAS////////*/
import { getOneUserByNicknameFromDatabase } from '../models/usersModel.js';
import { getAllTracksByUserIdFromDatabase } from "../models/tracksModel.js";
import { deleteOneTrackFromDatabase } from "../models/tracksModel.js";
import { deleteFileInFirebase } from "./uploadsController.js";
import { getFirebasePathFromUrl } from "./uploadsController.js";


/*----- CONTROLADORES -----*/ 

/*------ ELIMINAR UN USUARIO ------*/
const deleteOneUser = async (req, res) => {
    const { nickname } = req.params;
    const userFound = await getOneUserByNicknameFromDatabase(nickname);
    if (!userFound) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    try {
        if (userFound.role === "superAdmin"){
            console.log('Error del controlador al eliminar un usuario');
            return res.status(500).json({ message: 'El usuario que desea eliminar es administrador.' });
        }
        const tracksFound = await getAllTracksByUserIdFromDatabase(userFound.id);
        for (const track of tracksFound) {
            if (track.cover_url) {
                const coverFilePath = getFirebasePathFromUrl(track.cover_url);
                const coverDeleteError = await deleteFileInFirebase(coverFilePath);
                if (coverDeleteError) {
                    throw new Error('Failed to delete cover image for track ID: ' + track.id);
                }
            }
            if (track.audio_url) {
                const audioFilePath = getFirebasePathFromUrl(track.audio_url);
                const audioDeleteError = await deleteFileInFirebase(audioFilePath);
                if (audioDeleteError) {
                    throw new Error('Failed to delete audio file for track ID: ' + track.id);
                }
            }
            await deleteOneTrackFromDatabase(track.id);
        }
        if (userFound.photo_url) {
            const photoFilePath = getFirebasePathFromUrl(userFound.photo_url);
            const photoDeleteError = await deleteFileInFirebase(photoFilePath);
            if (photoDeleteError) {
                throw new Error('Failed to delete user profile photo.');
            }
        }
        await deleteUserFromDatabase(nickname);
        console.log(`Usuario ${nickname} eliminado`);
        res.status(200).json({ message: 'Usuario ' + nickname + ' eliminado'});
    } 
    catch (error) {
        console.log('Error del controlador al eliminar un usuario:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};


/*------ ACTUALIZA EL ROL DE UN USUARIO ------*/
const setSuperAdminOneUser = async (req, res) => {
    const { nickname } = req.params;
    const role = "superAdmin";
    console.log(role);
    try {
        await setSuperAdminOneUserIntoDatabase(nickname, role);
        res.status(200).json({ message: 'Rol actualizado correctamente.' });
    } catch (error) {
        console.log('Error del controlador al actualizar el rol a un usuario');
        res.status(500).json({ message: 'Error del servidor.' });
    };
};


/*----- MÉTODOS IMPORTADOS -----*/ 
export {
    deleteOneUser, 
    setSuperAdminOneUser
};



