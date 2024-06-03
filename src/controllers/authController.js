/*------ IMPORTACIONES DE MÓDULOS ------*/
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

/*------ IMPORTACIONES DE FUNCIONES ------*/
import { generateTokenById } from '../libs/jwt.js'
import { findUserByEmailIntoDatabase } from '../models/authModel.js';
import { findUserByIdIntoDatabase } from '../models/authModel.js';
import { insertUserIntoDatabase } from '../models/authModel.js';
import { findUserByNicknameIntoDatabase } from '../models/authModel.js';
import { v4 as uuidv4 } from "uuid";

/*------ INCIO DE SESION ------*/
const signIn = async (req, res) => {
    console.log("Entrando");
    try {
        const { email, password } = req.body;
        if ( email == '' || password == '' ){
            return res.status(400).json({ message: 'Por favor, no deje campos vacíos.' })
        }
        const userFound = await findUserByEmailIntoDatabase(email);
        if (!userFound){
            return res.status(404).json({ message: 'Email no registrado.' })
        }
        else{
            const goodPassword = await bcryptjs.compare(password, userFound.password);
            if (!goodPassword){
                return res.status(400).json({ message: 'La contraseña no es correcta.' })
            } else {
                console.log("Generando token");
                const token = generateTokenById(userFound.id);
                console.log("Token generado: " + token);

                const dataSession = {
                    id: userFound.id,
                    nickname: userFound.nickname,
                    email: userFound.email,
                    photo_url: userFound.photo_url,
                    biography: userFound.biography,
                    calendar: userFound.calendar,
                    province: userFound.province,
                    role: userFound.role
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    //secure: process.env.NODE_ENV === 'production', // Usar 'secure' solo en producción
                    secure: true,
                    sameSite: 'none', // Esto puede ser 'lax' o 'strict'
                    maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
                });
                return res.status(200).json({ user: dataSession });
            }
        }
    } 
    catch (error) {
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};
/*------ REGISTRO ------*/
const signUp = async (req, res) => {
    console.log('RECIBIMOS POR EL BODY:');
    console.log(req.body);
    try {
        const { nickname, email, password, passwordConfirm, province } = req.body;
        if ( nickname == '' || email == '' || password == '' || passwordConfirm == '' || province == '' ){
            return res.status(400).json({ message: 'Por favor, no deje campos vacíos.' })
        }
        if (await findUserByEmailIntoDatabase(email)){
            return res.status(400).json({ message: 'El email ya está en uso.' });
        }
        else if (await findUserByNicknameIntoDatabase(nickname)){
            return res.status(400).json({ message: 'El nombre de artsita ya está en uso.' });
        }
        else if (password !== passwordConfirm){
            console.log("contraseñas no coinciden");
            return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
        }
        else
        {
            const newUser = {
                id: uuidv4(),
                nickname,
                email,
                password: await bcryptjs.hash(req.body.password, await bcryptjs.genSalt(10)),
                province
            };
            await insertUserIntoDatabase(newUser);

            const userFound = await findUserByEmailIntoDatabase(email);
            const token = generateTokenById(userFound.id);
            console.log("Token generado en signUp: " + token);
            const dataSession = {
                id: userFound.id,
                nickname: userFound.nickname,
                email: userFound.email,
                photo_url: userFound.photo_url,
                biography: userFound.biography,
                province: userFound.province,
                role: userFound.role
            };
            console.log(dataSession);

            res.cookie('token', token, {
                httpOnly: true,
                //secure: process.env.NODE_ENV === 'production', // Usar 'secure' solo en producción
                secure: true,
                sameSite: 'none', // Esto es importante si tu frontend y backend no comparten el mismo dominio top-level
                maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
            });

            return res.status(200).json({ user: dataSession });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};

const signOut = async (req, res) => {
    //Borramos la caché
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    return res.status(200).json({ message: 'Sesión cerrada correctamente.' });
};

/*------ OBTENER USUARIO POR EL TOKEN ------*/
const getUserByToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('TOKEN EN GETUSERBYTOKEN : ' + token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(400).json({ message: 'Token inválido', error: error.message  });
        }
        const userInSession = await findUserByIdIntoDatabase(decoded.id);
        console.log('Usuario ' + userInSession.nickname);
        if (!userInSession) {
            return res.status(400).json({ message: 'Token Inválido', error: error.message  });
        }
        return res.status(200).json({user: userInSession});
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
};


/*------ EXPORTACIONES ------*/
export {
    signIn,
    signUp,
    signOut,
    getUserByToken
}

