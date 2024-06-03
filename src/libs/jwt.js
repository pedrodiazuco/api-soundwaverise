// General imports
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();


// Function to provide user token
export const generateTokenById = (userId) =>
{
    console.log('GENERANDO TOKEN PARA EL ID: ' + userId);
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}