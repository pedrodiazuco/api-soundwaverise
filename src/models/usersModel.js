/*///////// IMPORTACIONES ////////*/
import pool from "../database/connection.js";


/*///////// MODELOS ////////*/

/*------ OBTENER TODOS LOS UAURIOS DE LA BASE DE DATOS ------*/
const getAllUsersFromDatabase = async () => {
    const client = await pool.connect();
    try {
        const {rows} = await client.query('SELECT * FROM users');
        if (rows.length === 0) {
            console.log("El usuario no está creado");
            return null;
        } else {
            return rows;
        }
    } catch (error) {
        console.error('Error during getAllUsersFromDatabase:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ OBTENER LOS DATOS DE UN USUARIO POR SU NICKNAME ------*/
const getOneUserByNicknameFromDatabase = async (user_nickname) => {
    const client = await pool.connect();
    try {
        console.log("NICKNAME EN EL MODELO: " + user_nickname);
        const {rows} = await client.query('SELECT * FROM users WHERE nickname = $1', [user_nickname]);
        if (rows.length === 0) {
            console.log("El usuario no está creado");
            return null;
        } else {
            return rows.length ? rows[0] : null;
        }
    } catch (error) {
        console.error('Error during getOneUserByNicknameFromDatabase:', error);
        throw error;
    } finally {
        client.release(); 
    }
};

/*------ OBTENER LOS DATOS DE UN USUARIO POR SU ID ------*/
const getOneUserByIdFromDatabase = async (user_id) => {
    const client = await pool.connect();
    try {
        const {rows} = await client.query('SELECT * FROM users WHERE id = $1', [user_id]);
        console.log('Usuario ' + user_id + ' recibido');
        if (rows.length === 0) {
            console.log("El usuario no está creado");
            return null;
        } else {
            return rows.length ? rows[0] : null;
        }
    } catch (error) {
        console.error('Error during getOneUserByIdFromDatabase:', error);
        throw error;
    } finally {
        client.release(); 
    }
};

/*------ ACTUALIZAR LA BIO DE UN USUARIO POR SU ID ------*/
const updateBioOneUserFromDatabase = async (user_id, updatedUserData) => {
    const client = await pool.connect();
    try {
        const { photo_url, biography } = updatedUserData;
        console.log('Biografía en modelo:')
        console.log(biography);
        const result = await client.query(
            'UPDATE users SET photo_url = $2, biography = $3 WHERE id = $1',
            [user_id, photo_url, biography]
        );
        return result.rowCount > 0;  // Retorna true si la actualización fue exitosa
    } catch (error) {
        console.error('Error during updateBioOneUserFromDatabase:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ ACTUALIZAR LAS CREDENCIALES DE UN USUARIO POR SU ID ------*/
const updateCredentialsOneUserFromDatabase = async (user_id, updatedUserData) => {
    const client = await pool.connect();
    try {
        const { nickname, email, password } = updatedUserData;
        const result = await client.query(
            'UPDATE users SET nickname = $2, email = $3, password = $4 WHERE id = $1',
            [user_id, nickname, email, password]
        );
        return result.rowCount > 0;  // Retorna true si la actualización fue exitosa
    } catch (error) {
        console.error('Error during updateBioOneUserFromDatabase:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ ACTUALIZAR LOS DATOS DE UN USUARIO POR SU ID ------*/

/*///////// EXPORTACIONES ////////*/
export {
    getAllUsersFromDatabase,
    getOneUserByNicknameFromDatabase,
    getOneUserByIdFromDatabase,
    updateBioOneUserFromDatabase,
    updateCredentialsOneUserFromDatabase
};