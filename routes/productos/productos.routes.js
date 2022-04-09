const express = require('express');

const router = express.Router();

const { generarProductos } = require('../../mock/productosMock')


router.get('/productos-test', (req, res) => {

    const nProd1 = generarProductos()
    const nProd2 = generarProductos()
    const nProd3 = generarProductos()
    const nProd4 = generarProductos()
    const nProd5 = generarProductos()

    const productos = []
    productos.push(nProd1)
    productos.push(nProd2)
    productos.push(nProd3)
    productos.push(nProd4)
    productos.push(nProd5)

    res.render("layouts/index", {
        productos: productos,
        hayProductos: productos.length,
        isFaker: true
    });

})

module.exports = router;