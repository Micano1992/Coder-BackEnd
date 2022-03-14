const dbconfig = require('./config');
const knex = require('knex')(dbconfig.mariaDB);

(async () => {
    try {
        const tableExist = await knex.schema.hasTable('productos');
        if (!tableExist) {

            await knex.schema.createTable('productos', (table) => {
                table.increments('id')
                table.string('nombre').notNullable()
                table.string('imagen').notNullable()
                table.decimal('precio', 10, 2).notNullable()
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
