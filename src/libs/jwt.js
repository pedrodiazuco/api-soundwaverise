// General imports
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();


// Function to provide user token
export const generateTokenById = (userId) =>
{
    console.log('clave secreta recibida: ' + process.env.JWT_SECRET);
    console.log('GENERANDO TOKEN PARA EL ID: ' + userId);
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}