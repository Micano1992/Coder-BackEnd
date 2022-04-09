const fs = require('fs');

const ruta = 'modelos/contenedores/Chat.txt'

class contenedorChat {

    constructor() {
    }


    save = async () => {
        try {

            let chat = { id: 0, timestamp: 0 }

            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const chats = JSON.parse(contenido)

            let ultimoId = await this.obtenerUltimoId()

            carrito.id = ultimoId;

            const hora = new Date(Date.now())

            chat.timestamp = hora.toDateString()

            chats.push(chat);

            await fs.promises.writeFile(ruta, JSON.stringify(chats, null, 2))

            this.actualizarUltimoId()

            return chat

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    deleteById = async (id) => {

        try {
            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const carritos = JSON.parse(contenido)

            const carritosFiltrados = carritos.filter(carr => carr.id != id)

            await fs.promises.writeFile(ruta, JSON.stringify(carritosFiltrados, null, 2))
        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    getById = async (id) => {

        try {

            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const carritos = JSON.parse(contenido)

            const carritoBuscado = carritos.find(carr => carr.id == id)

            return carritoBuscado
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

    update = async (carrito) => {
        try {
            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const carritos = JSON.parse(contenido)

            const carritosFiltrados = carritos.filter(carr => carr.id != carrito.id)

            console.log(carritosFiltrados)

            carritosFiltrados.push(carrito)

            await fs.promises.writeFile(ruta, JSON.stringify(carritosFiltrados, null, 2))

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

    addProduct = async (producto, idCarrito) => {
        try {

            const contenido = await fs.promises.readFile(ruta, 'utf-8')

            const carritos = JSON.parse(contenido)

            let ultimoId = await this.obtenerUltimoId()

            carrito.id = ultimoId;

            const hora = new Date(Date.now())

            carrito.timestamp = hora.toDateString()

            carritos.push(carrito);

            await fs.promises.writeFile(ruta, JSON.stringify(carritos, null, 2))

            this.actualizarUltimoId()

            return carrito

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    obtenerUltimoId = async () => {
        const contenido = fs.promises.readFile('modelos/contenedores/ultimoIdCarrito.txt', 'utf-8')

        return contenido
    }

    actualizarUltimoId = async () => {

        let nuevoId = 0

        this.obtenerUltimoId().then(
            (resultado) => {

                nuevoId = Number(resultado) + 1

                fs.promises.writeFile('modelos/contenedores/ultimoIdChat.txt', nuevoId.toString())
            })
    }
}

module.exports = contenedorChat