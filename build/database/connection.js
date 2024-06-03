"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pg = _interopRequireDefault(require("pg"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
///Importamos el cliente pg

var Pool = _pg["default"].Pool; //Añadimos a pool

_dotenv["default"].config();

//Configuramos la conexión a la base de datos localhost
/*
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "soundwaverise",
    password: "root",
    port: 5432
});*/

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Esto puede ser necesario dependiendo de tu configuración de Heroku
  }
});
var _default = exports["default"] = pool;