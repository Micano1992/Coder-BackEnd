const { Schema } = require('mongoose')
const contenedorMongo = require('../../contenedores/contenedorMongo')

const collection = 'chat'

const chatSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    mail: { type: String, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
    edad: { type: Number, min: 0, required: true },
    fecha: { type: Date, min: Date.now() },
    texto: { type: String, required: true },
})

class ChatDaoMongo extends contenedorMongo {
    constructor() {
        super(collection, chatSchema)
    }

}

module.exports = ChatDaoMongo