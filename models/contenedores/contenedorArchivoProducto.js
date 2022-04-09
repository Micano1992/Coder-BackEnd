const fs = require('fs');

const ruta = 'modelos/contenedores/productos.txt'

class ContenedorProducto {

    constructor(ruta) {
        this.ruta = ruta
    }


    save = async (producto) => {
        try {
            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            let ultimoId = await this.obtenerUltimoId()

            producto.id = ultimoId;

            const hora = new Date(Date.now())

            producto.timestamp = hora.toDateString()

            productos.push(producto);

            await fs.promises.writeFile(ruta, JSON.stringify(productos, null, 2))

            this.actualizarUltimoId()

            return producto.id

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    getById = async (id) => {

        try {

            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            const productoBuscado = productos.find(prod => prod.id == id)

            return productoBuscado
        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    getAll = async () => {

        try {
            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            return productos

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    update = async (producto) => {
        try {
            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            const productosFiltrados = productos.filter(prod => prod.id != producto.id)

            console.log(productosFiltrados)

            productosFiltrados.push(producto)

            await fs.promises.writeFile(ruta, JSON.stringify(productosFiltrados, null, 2))

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    deleteById = async (id) => {

        try {
            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            const productosFiltrados = productos.filter(prod => prod.id != id)

            await fs.promises.writeFile(ruta, JSON.stringify(productosFiltrados, null, 2))
        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    deleteAll = async () => {

        try {
            let productos = []

            await fs.promises.writeFile(ruta, JSON.stringify(productos, null, 2))
                .then(() => {
                    console.log("Se borran los elementos")
                })
        }

        catch (err) {
            console.log(err)
        }

    }


    obtenerUltimoId = async () => {
        const contenido = fs.promises.readFile('modelos/contenedores/ultimoIdProducto.txt', 'utf-8')

        return contenido
    }

    actualizarUltimoId = async () => {

        let nuevoId = 0

        this.obtenerUltimoId().then(
            (resultado) => {

                nuevoId = Number(resultado) + 1

                fs.promises.writeFile('modelos/contenedores//ultimoIdProducto.txt', nuevoId.toString())
            })
    }
}

module.exports = ContenedorProducto