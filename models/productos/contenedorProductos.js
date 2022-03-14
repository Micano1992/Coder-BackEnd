const fs = require('fs');
// const dbconfig = require('../../db/config');
let knex;

class ContenedorProducto {

    constructor(objConfig) {
        // const knex = require('knex')(dbconfig.mariaDB);
        knex = require('knex')(objConfig);
    }


    save = async (producto) => {
        try {
            await knex('productos').insert(producto)

            const ultimoId = await knex.from('productos')
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

            console.log('Se abre conexión')
            let data = await knex.from('productos')
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

module.exports = ContenedorProducto