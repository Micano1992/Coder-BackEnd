const express = require('express');

const router = express.Router();


let productos = [{
    "id": 1,
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
}]

let ultimoId = 1

router.get('/', (req, res) => {

    res.json({ productos: productos })
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    res.json({ buscada: productos.find(producto => producto.id == id) })
})

router.post('/', (req, res) => {

    const { title, price, thumbnail } = req.body

    if (!title || !price || !thumbnail) {
        return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
    }

    ultimoId += 1

    productos.push({ id: ultimoId, title: title, price: price, thumbnail: thumbnail })

    console.log(productos)

    res.json({
        nuevoProducto: { id: ultimoId, title: title, price: price, thumbnail: thumbnail }
    })

})

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const infoBody = req.body;

    const productoViejo = productos.find(producto => producto.id == id)

    if (!productoViejo) {
        res.json({
            error: "Producto no encontrado"
        })
    }
    else {

        console.log(productoViejo)

        productos[+id - 1] = { id: +id, ...infoBody }

        res.json({
            actualizado: productos[+id - 1],
        })
    }

})

router.delete('/:id', (req, res) => {

    const { id } = req.params

    if (!productos.find(producto => producto.id == id)) {
        res.json({
            error: "Producto no encontrado"
        })
    }
    else {

        productos = productos.filter(producto => producto.id != id)

        res.json({
            respuesta: "Se elimino el producto"
        })
    }


})

module.exports = router