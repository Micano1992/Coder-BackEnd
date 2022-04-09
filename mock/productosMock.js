const faker = require('faker')
faker.locale = 'es'


const generarProductos = () => {
    const producto = {
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        imagen: faker.image.business(400, 400, true)
    }

    console.log(producto)

    return producto
}

module.exports = { generarProductos } 
