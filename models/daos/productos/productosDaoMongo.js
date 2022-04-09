const { Schema } = require('mongoose')
const contenedorMongo = require('../../contenedores/contenedorMongo')

const collection = 'productos'

const productosSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, min: 0, required: true },
    imagen: { type: String },

})

class ProductosDaoMongo extends contenedorMongo {
    constructor() {
        super(collection, productosSchema)
    }

}

module.exports = ProductosDaoMongo