const express = require("express");//se llama a express
const bodyParser = require("body-parser");//se importa bodyparse para que pueda leer json
const cors = require("cors");
const { API_VERSION } = require("./constants");//se llama a la configuracion de al BD en mongodb

//se instancia express en al constante app para poder usarla
const app = express();

// Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");


// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));//se llama al bodyparse
app.use(bodyParser.json()); //se configura para json

// Configure static folder
app.use(express.static("uploads")); //se crea la carpeta estatica

app.use(cors()); //se invocan las cors

//en esta llamada se cargaran todos las rutas que se creen en el archivo router/auth
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);





module.exports = app;