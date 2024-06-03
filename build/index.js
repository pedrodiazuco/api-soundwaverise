"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _usersRoutes = _interopRequireDefault(require("./routes/usersRoutes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _superAdminRoutes = _interopRequireDefault(require("./routes/superAdminRoutes.js"));
var _tracksRoutes = _interopRequireDefault(require("./routes/tracksRoutes.js"));
var _uploadsRoutes = _interopRequireDefault(require("./routes/uploadsRoutes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//IMPORTACIONES GENERALES
//Para importar express
// Para importar las variables de entorno
//Para importar morgan

//INICIALIZACIÓNES PRINCIPALES
var app = (0, _express["default"])();
_dotenv["default"].config();
var PORT = process.env.PORT || 3000;

//MIDDLEWARES PRINCIPALES
// Middleware para manejar solicitudes JSON
app.use(_express["default"].json());
// Middleware para ver solicitudes por consola
app.use((0, _morgan["default"])('dev'));
// Middleware de configuración de CORS
var corsOptions = {
  origin: 'http://localhost:5173',
  // Asegúrate de reemplazar esto con el dominio correcto de tu frontend
  credentials: true,
  // Permitir el envío de cookies y headers de autorización
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) fallan en 204
};
app.use((0, _cors["default"])(corsOptions));
// Middleware para parsear cookies
app.use((0, _cookieParser["default"])());

// Rutas API REST
app.use('/api/users', _usersRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/superAdmin', _superAdminRoutes["default"]);
app.use('/api/tracks', _tracksRoutes["default"]);
app.use('/api/upload', _uploadsRoutes["default"]);

// Manejo de errores
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Escuchar en el puerto
app.listen(PORT, function () {
  console.log("Servidor express escuchando en el puerto " + PORT);
});