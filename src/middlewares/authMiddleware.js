import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('TOKEN RECIBIDO EN PROTECT: ' + token);
        if (!token) {
            return res.status(401).json({ message: "No autorizado, token no encontrado" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Token inválido" });
        }
        console.log('TOKEN CORRECTO EN PROTECT');
        next();
    } catch (error) {
        console.error('Error verificando el token:', error);
        res.status(401).json({ message: "No autorizado, token inválido" });
    }
};

export default protect;
