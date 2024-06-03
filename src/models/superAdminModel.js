/*///////// IMPORTACIONES ////////*/
import pool from "../database/connection.js";


/*///////// MODELOS ////////*/

/*------ ELIMINAR UN USUARIO POR SU NIKCNAME ------*/
const deleteUserFromDatabase = async (user_nickname) => {
    console.log("Email a eliminar: " + user_nickname)
    const client = await pool.connect();
    try {
        await client.query(
            'DELETE FROM users WHERE nickname = $1', 
            [user_nickname]
        );
    } catch (error) {
        console.error('Error during deleteUserFromDatabase:', error);
        throw error;
    } finally {
        client.release();  
    }
};

/*------ ACTUALIZA EL ROL DE UN USUARIO POR SU NIKCNAME ------*/
const setSuperAdminOneUserIntoDatabase = async (user_nickname, role) => {
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE users SET role = $1 WHERE nickname = $2', 
            [role, user_nickname]
        );
        return;
    } finally {
        client.release(); 
    }
};

/*///////// EXPORTACIONES ////////*/
export {
    deleteUserFromDatabase,
    setSuperAdminOneUserIntoDatabase
};