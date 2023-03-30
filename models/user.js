//3º se crea el modelo del usuario
//para ello lo primero es conectarse a mongoose que previamente se ha importado la dependencia

const mongoose = require("mongoose");

//se crea el Squema
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String, 
    unique: true, //resctriciones de typo de datos
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});

module.exports = mongoose.model("User", UserSchema);