/*///////// IMPORTACIONES ////////*/
import jwt from 'jsonwebtoken'
import { findUserByIdIntoDatabase } from '../models/authModel.js';

/*------ COMPROBAR SI UN USUARIO 'USER' A INICIADO SESIÓN ------*/
const isInSession = async (req, res, next) => {
    console.log('EN LA FUNCIÓN ISINSESSION');
    try {
        const token = req.cookies.token;
        console.log('TOKEN EN ISINSESSION :' + token);
        if (!token) {
            console.log('No hay token');
            return res.status(401).json({ message: 'Sin autorización: No tienes token' });
        } else {
            const decoded = jwt.verify(token, 'secret');
            const userInSession = await findUserByIdIntoDatabase(decoded.id);
            console.log("El usuario de la sesion: " + userInSession.nickname);
            
            if (!userInSession){
                console.log("No hay usuario");
                return res.status(401).json({message: 'Sin autorización: Token inválido'});
            } 
            else {
                console.log(userInSession.role);
                if (userInSession.role === 'user' || userInSession.role === 'superAdmin'){
                    console.log("El rol del usuario es usuario");
                    next();
                }else{
                    return res.status(401).json({message: 'Sin autorización: Se requiere rol usuario'});
                }
            }
        }
    } catch (error) {
        return res.status(401).json({message: 'No tienes autorización'});
    }
};

/*------ COMPROBAR SI UN USUARIO 'SUPERADMIN' A INICIADO SESIÓN ------*/
const isSuperAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('TOKEN EN ISINSESSION :' + token);
        if (!token) {
            console.log('No hay token');
            return res.status(401).json({ message: 'Sin autorización: No tienes token' });
        }
        else {
            const decoded = jwt.verify(token, 'secret');
            const userInSession = await findUserByIdIntoDatabase(decoded.id);
            console.log("El usuario de la sesion: " + userInSession.nickname);
            console.log("El rol del usuario es: " + userInSession.role);
            
            if (!userInSession){
                console.log("No existe el usuario");
                return res.status(401).json({message: 'Sin autorización: Token inválido'});
            } else {
                if (userInSession.role === 'superAdmin'){
                    next();
                }
                else{
                    return res.status(401).json({message: 'Sin autorización: Se requiere rol superAdmin'});
                }
            }
        }
    } catch (error) {
        return res.status(401).json({message: 'No tienes autorización'});
    }
};

export {
    isInSession,
    isSuperAdmin
};