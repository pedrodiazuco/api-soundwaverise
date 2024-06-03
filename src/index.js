//IMPORTACIONES GENERALES
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import express from 'express'; //Para importar express
import morgan from 'morgan'; //Para importar morgan
import cors from 'cors'; 
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import tracksRoutes from './routes/tracksRoutes.js';
import uploadsRoutes from './routes/uploadsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: `${__dirname}/../.env` });

//INICIALIZACIÓNES PRINCIPALES
const app = express();
const PORT = process.env.PORT || 3000;


//MIDDLEWARES PRINCIPALES
// Middleware para manejar solicitudes JSON
app.use(express.json());
// Middleware para ver solicitudes por consola
app.use(morgan('dev'));
// Middleware de configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173',  // Asegúrate de reemplazar esto con el dominio correcto de tu frontend
    credentials: true,  // Permitir el envío de cookies y headers de autorización
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) fallan en 204
};
app.use(cors(corsOptions));
// Middleware para parsear cookies
app.use(cookieParser());

// Rutas API REST
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/superAdmin', superAdminRoutes);
app.use('/api/tracks', tracksRoutes);
app.use('/api/upload', uploadsRoutes);

//Para servir los archivos estáticos a VITE
app.use(express.static('build'));
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Escuchar en el puerto
app.listen(PORT, () => {
    console.log("Servidor express escuchando en el puerto " + PORT)
});