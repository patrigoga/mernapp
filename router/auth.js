//se crea la llamada/importar  express
//2º se hace la llamada al controlador, en este caso auth.js de la carpeta controllers
const express = require("express");
const AuthController = require("../controllers/auth");
//se crea constante para definir las rutas
const api = express.Router();

//se crea el tipo de endPoint y se le crea el nombre de la ruta apuntando al controlller en este caso la constantante
//AuthoController: porque es la que esta llamando a las funciones del archivo auth de la carpete controller (controllers/auth)
// en este ejemplo llamamos a la funcion register que es la que esta importada en controllers/auth
api.post("/auth/register", AuthController.register);

api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

module.exports = api;