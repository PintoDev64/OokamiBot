//Envioment Variables
const dotenv = require('dotenv');
dotenv.config();
//Tokens que se usaran en la aplicacion
const TOKENS = {
    OokamiToken: process.env.TOKEN,
    OokamiClientId: process.env.CLIENTID
}
module.exports = {
    TOKENS
}