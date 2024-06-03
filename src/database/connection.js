import pkg from 'pg'; ///Importamos el cliente pg
import dotenv from 'dotenv';
const { Pool } = pkg; //Añadimos a pool


dotenv.config();

//Configuramos la conexión a la base de datos localhost
/*
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "soundwaverise",
    password: "root",
    port: 5432
});*/

//Configuramos la conexión a la base de datos en heroku
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Esto puede ser necesario dependiendo de tu configuración de Heroku
    }
});


export default pool;