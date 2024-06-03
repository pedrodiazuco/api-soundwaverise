/*///////// IMPORTACIÓN DE CONEXIÓN BBDD ////////*/
import pool from "../database/connection.js";


/*///////// MODELOS ////////*/

/*------ OBTENER UN USUARIO DE LA BASE DE DATOS POR EL EMAIL ------*/
const findUserByEmailIntoDatabase = async (user_email) => {
    const client = await pool.connect();
    console.log("email recibido " + user_email)
    try {
        const {rows} = await client.query(
            'SELECT * FROM users WHERE email = $1', 
            [user_email]
        );
        if (rows.length === 0) {
            console.log("El email no está creado");
            return null;
        } else {
            return rows.length ? rows[0] : null;
        }
    } catch (error) {
        console.error('Error during findUserByEmailIntoDatabase:', error);
        throw error;
    } finally {
        client.release(); 
    };
};

/*------ OBTENER UN USUARIO DE LA BASE DE DATOS POR EL EMAIL ------*/
const findUserByNicknameIntoDatabase = async (user_nickname) => {
    const client = await pool.connect();
    console.log("nickname recibido " + user_nickname)
    try {
        const {rows} = await client.query(
            'SELECT * FROM users WHERE nickname = $1',
            [user_nickname]
        );
        if (rows.length === 0) {
            console.log("El usuario no está creado");
            return null;
        } else {
            return rows.length ? rows[0] : null;
        }
    } catch (error) {
        console.error('Error during findUserByNicknameIntoDatabase:', error);
        throw error;
    } finally {
        client.release(); 
    };
};

/*------ OBTENER UN USUARIO DE LA BASE DE DATOS POR SU ID ------*/
const findUserByIdIntoDatabase = async (user_id) => {
    console.log(user_id);
    const client = await pool.connect();
    try {
        const {rows} = await client.query(
            'SELECT * FROM users WHERE id = $1', 
            [user_id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during findUserByIdIntoDatabase:', error);
        return null;
        throw error;
    } finally {
        client.release(); 
    };
};

/*------ INSERTAR UN USUARIO EN LA BASE DE DATOS ------*/
const insertUserIntoDatabase = async (user_data) => {
    const client = await pool.connect();
    const {id, nickname, email, password, photo_URL, biography, calendar, province} = user_data;
    try {
        //console.log("La foto es " + photo);
        const result = await client.query(
            'INSERT INTO users (id, nickname, email, password, photo_URL, biography, province) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id, nickname, email, password, photo_URL, biography, province]
        )
        return result.rowCount > 0;  // Retorna true si la actualización fue exitosa
    } catch (error) {
        console.error('Error during insertUserIntoDatabase:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*///////// EXPORTACIONES ////////*/
export {
    findUserByEmailIntoDatabase,
    findUserByNicknameIntoDatabase,
    findUserByIdIntoDatabase,
    insertUserIntoDatabase,
};