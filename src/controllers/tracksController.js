/*------ IMPORTACIONES DE MÓDULOS ------*/
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

/*///////// IMPORTACIONES ////////*/
import { getAllTracksFromDatabase } from "../models/tracksModel.js";
import { getOneTrackByIdFromDatabase } from "../models/tracksModel.js";
import { getAllTracksByUserIdFromDatabase } from "../models/tracksModel.js";
import { insertTrackIntoDatabase } from "../models/tracksModel.js";
import { updateTrackFromDatabase } from "../models/tracksModel.js";
import { deleteOneTrackFromDatabase } from "../models/tracksModel.js";
import { incrementPlaysOneTrackFromDatabase } from "../models/tracksModel.js";
import { checkIfLikeExistsIntoDatabase } from '../models/tracksModel.js';
import { createLikeIntoDatabase } from "../models/tracksModel.js";
import { createCommentIntoDatabase } from '../models/tracksModel.js';
import { getCommentsByTrackIdFromDataBase } from "../models/tracksModel.js";
import { checkIfUserHasCommentedOneTrackFromDatabase } from "../models/tracksModel.js";
/*///////// IMPORTACIONES EXTERNAS////////*/
import { findUserByIdIntoDatabase } from "../models/authModel.js";
import { getUserByToken } from "./authController.js";
import { deleteFileInFirebase } from "./uploadsController.js";
import { getFirebasePathFromUrl } from "./uploadsController.js";



/*///////// CONTROLADORES ////////*/
/*////////////////////////////////*/

/*------ OBTENER TODOS LOS TRACKS ------*/
const getAllTracks = async (req, res) => {
    try {
        console.log('Obteniendo tracks DB');
        const tracks = await getAllTracksFromDatabase();
        if (tracks) {
            return res.status(200).json({ tracks: tracks });
        } else{
            return res.status(404).json({ message: 'No se encuentran tracks'});
        }
    } 
    catch (error) {
        console.log('Error del controlador obteneniendo los tracks.');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER LOS TRACKS RECIENTES DE UN USUARIO POR SU ID ------*/
const getAllTrackskByUserId = async (req, res) => {
    const user_id = req.params.id;
    try {
        console.log(user_id);
        const tracks = await getAllTracksByUserIdFromDatabase(user_id);
        if (tracks) {
            return res.status(200).json({ tracks: tracks });
        } else{
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }
    } 
    catch (error) {
        console.log('Error del controlador al obtener el track');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER LOS DATOS DE UN TRACK POR SU ID ------*/
const getOneTrackById = async (req, res) => {
    const track_id = req.params.id;
    console.log(track_id);
    try {
        const track = await getOneTrackByIdFromDatabase(track_id);
        if (track) {
            return res.status(200).json({ track: track });
        } else{
            return res.status(404).json({ message: 'Track no encontrado'});
        }
    } 
    catch (error) {
        console.log('Error del controlador al obtener el track');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ CREAR UN TRACK CON LOS DATOS QUE RECIBE ------*/
const createNewTrack = async (req, res) => {
    const { id, title, genre, audio_url, cover_url, description } = req.body;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Autenticación requerida' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Token inválido', error: error.message  });
        }
        const userInSession = await findUserByIdIntoDatabase(decoded.id);

        const newTrack = {
            id,
            user_id: userInSession.id,
            title,
            genre,
            upload_date: new Date().toISOString(),
            audio_url,
            cover_url,
            description
        }
        
        const track = await insertTrackIntoDatabase(newTrack);
        console.log(track);
        return res.status(200).json({ track: track });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ ELIMINAR UN TRACK POR SU ID ------*/
const deleteOneTrack = async (req, res) => {
    const track_id = req.params.id;
    try {
        const trackFound = await getOneTrackByIdFromDatabase(track_id);
        if (!trackFound){
            return res.status(400).json({ message: 'No existe el track con el ID proporcionado.', error: error.message });
        }
        const token = req.cookies.token;
        console.log('GET USER BY TOKEN :' + token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Token inválido', error: error.message  });
        }
        const userInSession = await findUserByIdIntoDatabase(decoded.id);
        console.log(trackFound.user.id +" === " + userInSession.id);
        if (trackFound.user_id !== userInSession.id && userInSession.role !== 'superAdmin'){
            console.log('No eres el usuario indicado para eliminar un track.');
            return res.status(500).json({ message: 'No tienes acceso para eliminar el track.', error: error.message });
        }
        else {
            console.log(trackFound);
            if (trackFound.cover_url) {
                const coverFilePath = getFirebasePathFromUrl(trackFound.cover_url);
                const coverDeleteError = await deleteFileInFirebase(coverFilePath);
                if (coverDeleteError) {
                    throw new Error('Failed to delete cover image.');
                }
                console.log("Cover eliminado");
            }
            if (trackFound.audio_url) {
                const audioFilePath = getFirebasePathFromUrl(trackFound.audio_url);
                const audioDeleteError = await deleteFileInFirebase(audioFilePath);
                if (audioDeleteError) {
                    throw new Error('Failed to delete audio file.');
                }
                console.log("Audio eliminado");
            }
            await deleteOneTrackFromDatabase(track_id);
            return res.status(200).json({ message: 'Track ' + track_id + ' eliminado'});
        }  
    } 
    catch (error) {
        console.log('Error del controlador al eliminar un track:', error);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ ACTUALIZAR UN TRACK CON LOS DATOS QUE RECIBE POR SU ID ------*/
const updateOneTrack = async (req, res) => {
    const track_id = req.params.id;
    const { title, genre, cover_url, description } = req.body;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Autenticación requerida' });
        }
        const trackFound = await getOneTrackByIdFromDatabase(track_id);
        if (!trackFound){
            return res.status(404).json({ message: 'No existe el track con el Id proporcionado' });
        }
        const userInSession = await getUserByToken(token);
        if(userInSession.id !== trackFound.id){
            return res.status(403).json({ message: 'No eres el propietario del track a actualizar' });
        }
        else{
            const updatedTrackData = {
                title,
                genre,
                cover_url,
                description
            }
            const updateResult = await updateTrackFromDatabase(id, updatedTrackData);
            if (updateResult) {
                return res.status(200).json({ message: 'Track actualizado correctamente' });
            } else {
                return res.status(400).json({ message: 'Actualización fallida' });
            }
        }
    } 
    catch (error) {
        console.log('Error en el controlador al actualizar un track');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ CREAR UN LIKE EN LA BASE DE DATOS (COMPRUEBA QUE NO EXISTA) ------*/
const incrementPlaysOneTrack = async (req, res) => {
    const track_id = req.params.id;
    try {
        const trackFound = await getOneTrackByIdFromDatabase(track_id);
        if (!trackFound){
            console.log(track_id);
            console.log('track no encontrado');
            return res.status(404).json({ message: 'No existe el track con el Id proporcionado' });
        }
        else {
            await incrementPlaysOneTrackFromDatabase(track_id);
            return res.status(200).json({ message: 'Play añadido correctamente.'});
        }
    } 
    catch (error) {
        console.log('Error en el controlador al añadir un like');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ CREAR UN LIKE EN LA BASE DE DATOS (COMPRUEBA QUE NO EXISTA) ------*/
const createNewLike = async (req, res) => {
    const track_id = req.params.id;
    const { user_id } = req.body;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Autenticación requerida' });
        }
        const trackFound = await getOneTrackByIdFromDatabase(track_id);
        if (!trackFound){
            return res.status(404).json({ message: 'No existe el track con el Id proporcionado' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userInSession = await findUserByIdIntoDatabase(decoded.id);
        if(userInSession.id !== user_id){
            return res.status(403).json({ message: 'El ID del usuario proporcinado no corresponde con el usuario de la sesión.' });
        }
        else {
            const likeData = {
                track_id,
                user_id
            }
            const hasLiked = await checkIfLikeExistsIntoDatabase(likeData);
            if (hasLiked) {
                return res.status(409).json({ message: 'Este usuario ya ha añadido su like a este track.' });
            }
            const newLikeData = {
                id: uuidv4(),
                track_id,
                user_id
            }
            await createLikeIntoDatabase(newLikeData);
            const likeCreated = await checkIfLikeExistsIntoDatabase(likeData);
            if (likeCreated) {
                return res.status(200).json({ message: 'Like añadido correctamente.'});
            } else {
                return res.status(400).json({ message: 'Like fallido' });
            }
        }
    } 
    catch (error) {
        console.log('Error en el controlador al añadir un like');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ CREAR UN COMENTARIO EN LA BASE DE DATOS ------*/
const createNewComment = async (req, res) => {
    const track_id = req.params.id;
    const { user_id, comment } = req.body;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Autenticación requerida' });
        }
        const trackFound = await getOneTrackByIdFromDatabase(track_id);
        if (!trackFound){
            return res.status(404).json({ message: 'No existe el track con el Id proporcionado' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userInSession = await findUserByIdIntoDatabase(decoded.id);
        if(userInSession.id !== user_id){
            return res.status(403).json({ message: 'El ID del usuario proporcinado no corresponde con el usuario de la sesión.' });
        }
        else {
            const newCommentData = {
                id: uuidv4(),
                track_id,
                user_id,
                comment
            }
            const comments = await createCommentIntoDatabase(newCommentData);
            if (comments) {
                return res.status(200).json({ message: 'Comentario añadido con éxito.', comments: comments });
            } else {
                return res.status(400).json({ message: 'Comentario fallido' });
            }
        }
    } 
    catch (error) {
        console.log('Error en el controlador al añadir un comentario');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER TODOS UN COMENTARIOS DE UNTRACK DE LA BASE DE DATOS ------*/
const getAllCommentsByTrackId = async (req, res) => {
    const track_id = req.params.id;
    try {
        const comments = await getCommentsByTrackIdFromDataBase(track_id);
        if (comments) {
            return res.status(200).json({ comments: comments });
        } else{
            return res.status(404).json({ message: 'No hay comentarios para este track.'});
        }
    } 
    catch (error) {
        console.log('Error en el controlador obtener los comentarios de un track.');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER SI UN USUARIO HA DADO LIKE A UN TRACK DE LA BASE DE DATOS ------*/
const checkIfUserHasLikedOneTrack = async (req, res) => {
    const track_id = req.params.id;
    const { user_id } = req.body;
    try {
        const likeData = {
            track_id,
            user_id
        }
        const hasLiked = await checkIfLikeExistsIntoDatabase(likeData);
        console.log("RESPUESTA HAS LIKED CONTROLADOR: " + hasLiked);
        return res.status(200).json({ hasLiked });
    } 
    catch (error) {
        console.log('Error en el controlador al comprobar si un usuario ha dado like a un track.');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER SI UN USUARIO HA COMENTADO UN TRACK DE LA BASE DE DATOS ------*/
const checkIfUserHasCommentedOneTrack = async (req, res) => {
    const track_id = req.params.id;
    const { user_id } = req.body;
    try {
        const commentData = {
            track_id,
            user_id
        };
        const hasCommented = await checkIfUserHasCommentedOneTrackFromDatabase(commentData);
        console.log("RESPUESTA HAS COMMENTED CONTROLADOR: " + hasCommented);
        return res.status(200).json({ hasCommented });
    } 
    catch (error) {
        console.log('Error en el controlador al comprobar si un usuario ha comentado un track.');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};


/*///////// EXPORTACIONES ////////*/
export {
    getAllTracks,
    getAllTrackskByUserId,
    getOneTrackById,
    updateOneTrack,
    createNewTrack,
    deleteOneTrack,
    incrementPlaysOneTrack,
    createNewLike,
    checkIfUserHasLikedOneTrack,
    createNewComment,
    getAllCommentsByTrackId,
    checkIfUserHasCommentedOneTrack
};