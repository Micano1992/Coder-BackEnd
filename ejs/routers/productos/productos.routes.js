const express = require('express');

const router = express.Router();

let productos = []

let ultimoId = 0

router.get('/', (req, res) => {

    res.render("vista", {
        productos: productos,
        hayProductos: productos.length
    });
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    res.json({ buscada: productos.find(producto => producto.id == id) })
})

router.post('/', (req, res) => {

    console.log(req.body)

    const { title, price, url } = req.body

    if (!title || !price || !url) {
        return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
    }

    ultimoId += 1

    productos.push({ id: ultimoId, title: title, price: price, url: url })

    res.redirect('/productos')

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