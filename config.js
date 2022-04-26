const PORT = process.env.PORT || 8080
const PERS = process.env.PERS || 'firebase'
const firebaseConfig = require('./db/firebase.config.json')
const dotenv = require('dotenv')
const path = require('path');
const minimist = require('minimist');



dotenv.config({
    path: path.resolve(__dirname, './prod.env')

})


const args = minimist(process.argv.slice(2), {
    default: {
        PORT: 8080,
    },
    alias: {
        p: 'PORT'
    }
});


module.exports = {
    ENV: {
        PORT,
        PERS
    },
    DB_CONFIG: {
        mongodb: {
            uri: 'mongodb://localhost/productos'
        },
        firebase: {
            certification: firebaseConfig
        }
    },
    USUARIO: process.env.USUARIO,
    PASSWORD: process.env.PASSWORD,
    PORT: args.PORT

}