/*------ IMPORTACIONES DE MÓDULOS ------*/
import jwt from 'jsonwebtoken';

/*///////// IMPORTACIONES ////////*/
import { getAllUsersFromDatabase } from "../models/usersModel.js";
import { getOneUserByNicknameFromDatabase } from "../models/usersModel.js";
import { getOneUserByIdFromDatabase } from '../models/usersModel.js';
import { updateBioOneUserFromDatabase } from "../models/usersModel.js";
import { updateCredentialsOneUserFromDatabase } from '../models/usersModel.js';

/*///////// CONTROLADORES ////////*/
/*////////////////////////////////*/

/*------ OBTENER TODOS LOS USUARIOS DE LA BASE DE DATOS ------*/
const getAllUsers = async (req, res) => {
    try {
        console.log('Obteniendo usuarios DB');
        const users = await getAllUsersFromDatabase();
        console.log('Usuarios obtenidos DB');
        return res.status(200).json({ users: users }); //Envía la respuesta JSON envolviendo los usuarios en un objeto
    } catch (error) {
        console.log('Error del controlador obtener los usuario');
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER UN USUARIO POR SU NICKNAME ------*/
const getOneUserByNickname = async (req, res) => {
    const { nickname } = req.params;
    try {
        console.log("NICKNAME EN EL CONTROLADOR: " + nickname);
        const user = await getOneUserByNicknameFromDatabase(nickname);
        if (user) {
            res.status(200).json({ user: user });
        } else{
            res.status(404).json({ message: 'Usuario no encontrado'});
        }
    } catch (error) {
        console.log('Error del controlador al obtener el usuario ' + nickname);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ OBTENER UN USUARIO POR SU NICKNAME ------*/
const getOneUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getOneUserByIdFromDatabase(id);
        if (user) {
            res.status(200).json({ user: user });
        } else{
            res.status(404).json({ message: 'Usuario no encontrado'});
        }
    } catch (error) {
        console.log('Error del controlador al obtener el usuario ' + id);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ ACTUALIZAR LA BIO UN USUARIO POR SU EMAIL ------*/
const updateBioOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.cookies.token;
        console.log('GET USER BY TOKEN :' + token);
        if (!token) {
            return res.status(400).json({ message: 'No ha iniciado sesión' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('token verificado');
        const userInSession = await getOneUserByIdFromDatabase(decoded.id);
        if (!userInSession) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        if (!(userInSession.id === id || userInSession.role === 'superAdmin')) {
            return res.status(400).json({ message: 'No eres el usuario a editar' });
        } else {
            console.log('Biografía del usuario '+ req.body.biography);
            const updatedUserData = {
                photo_url: req.body.photo_url,
                biography: req.body.biography
            };
            await updateBioOneUserFromDatabase(id, updatedUserData);
            const user = await getOneUserByIdFromDatabase(id);
            return res.status(200).json({ user: user });
        }
    } catch (error) {
        console.log('Error en el controlador al actualizar un usuario:', error);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

/*------ ACTUALIZAR LAS CREDENCIALES UN USUARIO POR SU EMAIL ------*/
const updateCredentialsOneUser = async (req, res) => {
    const { id } = req.params; // Se espera que el parámetro en la URL sea 'email'
    try {
        const token = req.headers['authorization'];
        const userInSession = await getUserByToken(token);
        console.log(userInSession.email + " " + email);
        if(userInSession.email !== email)
            res.status(400).json({ message: 'No eres el usuario a editar' });
        else{
            const updatedUserData = {
                nickname: req.body.nickname,
                email: req.body.email,
                password: await bcryptjs.hash(req.body.password, await bcryptjs.genSalt(10))
            }
            await updateCredentialsOneUserFromDatabase(id, updatedUserData);
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        }
    } catch (error) {
        console.log('Error en el controlador al actualizar un usuario');
        res.status(500).json({ message: 'Error del servidor.' });
    };
};

/*///////// EXPORTACIONES ////////*/
export {
    getAllUsers, 
    getOneUserByNickname,
    getOneUserById,
    updateBioOneUser,
    updateCredentialsOneUser
};