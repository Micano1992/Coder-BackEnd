const dbconfig = require('./config');
const knex = require('knex')(dbconfig.sqlite);

(async () => {
    try {
        const tableExist = await knex.schema.hasTable('mensajes');
        if (!tableExist) {
            await knex.schema.createTable('mensajes', (table) => {

                table.increments('id')
                table.string('autor').notNullable()
                table.string('texto').notNullable()
                table.timestamp('fecha').defaultTo(knex.fn.now())

            });
            console.log('Tabla creada');
        } else {
            console.log('Tabla ya creada');
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        knex.destroy();
    }
})();


