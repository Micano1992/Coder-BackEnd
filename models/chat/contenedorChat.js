const fs = require('fs')
const dbconfig = require('../../db/config');
// const knex = require('knex')(dbconfig.sqlite);
let knex
let tabla

class contenedorChat {

    constructor(objConfig, nTabla) {
        knex = require('knex')(objConfig);
        tabla = nTabla
    }


    save = async (mensaje) => {
        try {
            await knex(tabla).insert(mensaje)

            const ultimoId = await knex.from(tabla)
                .max('id')

            return ultimoId

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
            throw err
        }
        finally {
            // knex.destroy()
            console.log('Se cierra conexión')

        }
    }


    getAll = async () => {
        try {
            let data = await knex.from(tabla)
                .select('*')

            console.log(data)
            return data

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
            throw err
        }
        finally {
            // knex.destroy();
            console.log('Se cierra conexión');

        }
    }


    getAll = async () => {

        try {

            console.log('Se abre conexión')
            let data = await knex.from('mensajes')
                .select('*')

            return data

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
            throw err
        }
        finally {
            // knex.destroy();
            console.log('Se cierra conexión');

        }
    }
}


module.exports = contenedorChat