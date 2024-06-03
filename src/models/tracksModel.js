/*///////// IMPORTACIONES ////////*/
import pool from "../database/connection.js";


/*///////// MODELOS ////////*/
/*////////////////////////////////*/

pool.on('connect', () => console.log('Base de datos conectada con éxito'));
pool.on('error', (err) => console.log('Error de conexión a la base de datos:', err));

/*------ OBTENER TODOS LOS TRACKS DE LA BASE DE DATOS ------*/
const getAllTracksFromDatabase = async () => {
    console.log(process.env.DATABASE_URL);
    const client = await pool.connect();
    console.log("Conectando.");
    try {
        const { rows } = await client.query(`
            SELECT 
                tracks.*, 
                users.nickname,
                COALESCE(l.like_count, 0) AS like_count,
                COALESCE(c.comment_count, 0) AS comment_count,
                (tracks.plays + COALESCE(l.like_count, 0) * 5 + COALESCE(c.comment_count, 0) * 10) AS ranking
            FROM 
                tracks
            JOIN 
                users ON tracks.user_id = users.id
            LEFT JOIN 
                (SELECT track_id, COUNT(*) AS like_count FROM likes GROUP BY track_id) l ON l.track_id = tracks.id
            LEFT JOIN 
                (SELECT track_id, COUNT(*) AS comment_count FROM comments GROUP BY track_id) c ON c.track_id = tracks.id
        `);
        //COALESCE garantiza que si no hay likes ni comentarios el conteo sea 0 en lugar de null
        //LEFT JOIN para garantizar que incluso los tracks sin likes sean incluidos en los resultados
        console.log('Tracks recibidos' + rows);
        return rows;
    } catch (error) {
        console.error('Error al obtener los tracks en la BD:', error);
        throw error;
    } finally {
        client.release(); // Para liberar el cliente
    }
};

/*------ OBTENER LOS DATOS DE LOS TRACKS DE UN USUARIO POR SU ID ------*/
const getAllTracksByUserIdFromDatabase = async (user_id) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(`
            SELECT
                tracks.*, 
                users.nickname,
                COALESCE(l.like_count, 0) AS like_count,
                COALESCE(c.comment_count, 0) AS comment_count,
                (tracks.plays + COALESCE(l.like_count, 0) * 5 + COALESCE(c.comment_count, 0) * 10) AS ranking
            FROM 
                tracks
            JOIN 
                users ON tracks.user_id = users.id
            LEFT JOIN 
                (SELECT track_id, COUNT(*) AS like_count FROM likes GROUP BY track_id) l ON l.track_id = tracks.id
            LEFT JOIN 
                (SELECT track_id, COUNT(*) AS comment_count FROM comments GROUP BY track_id) c ON c.track_id = tracks.id
            WHERE 
                tracks.user_id = $1
        `, [user_id]);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los tracks en la BD:', error);
        throw error;
    } finally {
        client.release(); 
    }
};

/*------ OBTENER LOS DATOS DE UN TRACK POR SU ID ------*/
const getOneTrackByIdFromDatabase = async (track_id) => {
    console.log(track_id);
    const client = await pool.connect();
    try {
        const { rows } = await client.query(`
            SELECT 
                tracks.*,
                users.nickname,
                COALESCE(l.like_count, 0) AS like_count,
                COALESCE(c.comment_count, 0) AS comment_count
            FROM 
                tracks
            JOIN 
                users ON tracks.user_id = users.id
            LEFT JOIN 
                (SELECT track_id, COUNT(*) AS like_count FROM likes GROUP BY track_id) l ON l.track_id = tracks.id
            LEFT JOIN 
                (SELECT track_id, COUNT(*) AS comment_count FROM comments GROUP BY track_id) c ON c.track_id = tracks.id
            WHERE 
                tracks.id = $1;
        `, [track_id]);
        return rows[0]; //Devuelve el usuario encontrado o undefined si no
    } catch (error) {
        console.error('Error al obtener un track en la BD:', error);
        throw error;
    } finally {
        client.release(); 
    }
};

/*------ INSERTAR UN TRACK EN LA BASE DE DATOS ------*/
const insertTrackIntoDatabase = async (track) => {
    const client = await pool.connect();
    try {
        const {id, user_id, title, genre, upload_date, audio_url, cover_url, description} = track;
        console.log('Track ' + title + ' preparando para insertar');
        await client.query(`
            INSERT INTO tracks (id, user_id, title, genre, upload_date, audio_url, cover_url, description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `,[id, user_id, title, genre, upload_date, audio_url, cover_url, description]
        );
        console.log('Track ' + title + ' insertado en BD');
        const {rows} = await client.query('SELECT * FROM tracks WHERE id = $1', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al insertar track en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ ELIMINAR UN TRACK DE LA BASE DE DATOS POR SU ID ------*/
const deleteOneTrackFromDatabase = async (track_id) => {
    const client = await pool.connect();
    try {
        await client.query(
            `DELETE FROM tracks WHERE id = $1`, [track_id]
        );
    } catch (error) {
        console.error('Error al eliminar un track en la BD:', error);
        throw error;
    } finally {
        client.release();  
    }
}

/*------ ACTUALIZAR UN TRACK DE LA BASE DE DATOS POR SU ID ------*/
const updateTrackFromDatabase = async (track_id, updatedTrackData) => {
    const client = await pool.connect();
    try {
        const {title, genre, cover_url, description} = updatedTrackData;
        await client.query(
            `UPDATE tracks SET title = $2, genre = $3, cover_url = $4, description = $5 WHERE id = $1`,
            [track_id, title, genre, cover_url, description]
        );
    } catch (error) {
        console.error('Error al actualizar un track en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ INCREMNETAR PLAYS DE UN TRACK DE LA BASE DE DATOS POR SU ID ------*/
const incrementPlaysOneTrackFromDatabase = async (track_id) => {
    const client = await pool.connect();
    try {
        await client.query(
            `UPDATE tracks SET plays = plays + 1 WHERE id = $1`,
            [track_id]
        );
    } catch (error) {
        console.error('Error al incrementar los plays de un track en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ INSERTAR UN LIKE EN LA BASE DE DATOS ------*/
const createLikeIntoDatabase = async (likeData) => {
    const client = await pool.connect();
    try {
        const { id, track_id, user_id } = likeData;
        await client.query(
            `INSERT INTO likes (id, track_id, user_id)
            VALUES ($1, $2, $3)`,
            [id, track_id, user_id]
        );
    } catch (error) {
        console.error('Error al añadir un like en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ INSERTAR UN COMENTARIO EN LA BASE DE DATOS ------*/
const createCommentIntoDatabase = async (newCommentData) => {
    const client = await pool.connect();
    try {
        const { id, track_id, user_id, comment } = newCommentData;
        console.log(newCommentData);
        await client.query(
            `INSERT INTO comments (id, track_id, user_id, comment)
            VALUES ($1, $2, $3, $4)`,
            [id, track_id, user_id, comment]
        );
        return await getCommentsByTrackIdFromDataBase(track_id);
    } catch (error) {
        console.error('Error al añadir un comentario en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ OBTENER LOS COMENTARIOS UN TRACK EN LA BASE DE DATOS ------*/
const getCommentsByTrackIdFromDataBase = async (track_id) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(`
            SELECT 
            comments.id,
            comments.comment,
            users.nickname,
            users.photo_url
            FROM 
                COMMENTS
            JOIN 
                USERS ON COMMENTS.user_id = USERS.id
            WHERE 
                COMMENTS.track_id = $1;
        `, [track_id]);
        return rows;
    } catch (error) {
        console.error('Error al añadir un comentario en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ COMPROBAR SI EXISTE UN LIKE EN LA BASE DE DATOS ------*/
const checkIfLikeExistsIntoDatabase = async (likeData) => {
    const client = await pool.connect();
    try {
        const { track_id, user_id } = likeData;
        const result = await client.query(
            `SELECT 1 FROM likes WHERE track_id = $1 AND user_id = $2`,
            [track_id, user_id]
    );
    return result.rowCount > 0;
    } catch (error) {
        console.error('Error al comprobar si existe un like en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};

/*------ OBTENER LOS COMENTARIOS UN TRACK EN LA BASE DE DATOS ------*/
const checkIfUserHasCommentedOneTrackFromDatabase = async (commentData) => {
    const client = await pool.connect();
    try {
        const { track_id, user_id } = commentData;
        const result = await client.query(
            `SELECT 1 FROM comments WHERE track_id = $1 AND user_id = $2`,
            [track_id, user_id]
    );
    return result.rowCount > 0;
    } catch (error) {
        console.error('Error al comprobar si un usuario ha comentado en la BD:', error);
        throw error;
    } finally {
        client.release();
    }
};




/*///////// EXPORTACIONES ////////*/
export {
    getAllTracksFromDatabase,
    getAllTracksByUserIdFromDatabase,
    getOneTrackByIdFromDatabase,
    insertTrackIntoDatabase,
    deleteOneTrackFromDatabase,
    updateTrackFromDatabase,
    incrementPlaysOneTrackFromDatabase,
    checkIfLikeExistsIntoDatabase,
    createLikeIntoDatabase,
    createCommentIntoDatabase,
    getCommentsByTrackIdFromDataBase,
    checkIfUserHasCommentedOneTrackFromDatabase
};