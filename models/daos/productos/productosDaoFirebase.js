const ContenedorFirebase = require('../../contenedores/contenedorFirebase')

class FirebaseDaoProducto extends ContenedorFirebase {
    constructor() {
        super('productos')
    }
}

module.exports = FirebaseDaoProducto