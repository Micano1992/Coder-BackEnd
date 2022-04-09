const express = require('express')

const productosRoutes = require('./productos/productos.routes')
const router = express.Router()

//Routes
router.use('/api', productosRoutes)

module.exports = router;