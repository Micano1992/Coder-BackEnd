const ContenedorFirebase = require('../../contenedores/contenedorFirebase')

class FirebaseDaoChat extends ContenedorFirebase {
    constructor() {
        super('chat')
    }
}

module.exports = FirebaseDaoChat