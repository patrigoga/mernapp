//se importa el modelo, para poder usarlo en la llamada a la bd
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

//proceso para crear un endPoint  1º se crea la funcion
//2º se crea la ruta en el directorio router router en el archivo auth.js
function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,

    });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    user.save((error, userStorage) => {

        if (error) {
            res.status(400).send({ msg: "Error al crear el usuario" });
        } else {
            res.status(200).send(userStorage);
        }
    });

}
function login(req, res) {

    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase }, (error, userStore) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({ msg: "Error del servidor" });
                } else if (!check) {
                    res.status(400).send({ msg: "Contraseña incorrecta" });
                } else if (!userStore.active) {
                    res.status(401).send({ msg: "Usuario no autorizado o no activo" });
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore),
                    });
                }
            });
        }
    });
}
function refreshAccessToken(req, res) {
    const { token } = req.body;

    if (!token) res.status(400).send({ msg: "Token requerido" });

    const { user_id } = jwt.decoded(token);

    User.findOne({ _id: user_id }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
                
            });
        }
    });
}






module.exports = {
    //en este apartado se exporta aquellas funciones que se quieran inportar o utilizar en otros archivos
    register,
    login,
    refreshAccessToken


};