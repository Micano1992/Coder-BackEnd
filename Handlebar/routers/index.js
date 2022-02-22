const express = require('express')

const productosRoutes = require('./productos/productos.routes')

const router = express.Router()

//Middleware



//Routes
router.use('/productos', productosRoutes)

module.exports = router;