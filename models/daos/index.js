const { ENV: { PERS } } = require('../../config')

let productoDao
let chatDao

switch (PERS) {
    case 'firebase':
        productoDao = require('./productos/productosDaoFirebase')
        chatDao = require('./chat/chatDaoFirebase')
        break;
    case 'mongo':
        productoDao = require('./Productos/productosDaoMongo')
        chatDao = require('./chat/chatDaoMongo')
        break;
    case 'archivo':
        productoDao = require('./Productos/productosDaoArchivo')
        chatDao = require('./chat/chatDaoArchivo')
        break;
    default:
        throw new Error('Metodo de persistencia inválido')
}

module.exports = {
    productoDao,
    chatDao,
}