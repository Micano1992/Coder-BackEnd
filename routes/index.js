const express = require('express')
const path = require('path');
const auth = require('../middlewares/auth');
const config = require('../config')

const authControllers = require('../controllers/auth.controllers');
const passport = require('../middlewares/passport');


const productosRoutes = require('./productos/productos.routes')
const authRoutes = require('./auth/auth.routes')
const randomRoute = require('./randoms/randoms.route')
const router = express.Router()

//Routes
router.use('/api', productosRoutes)
router.use('/api', authRoutes)
router.use('/api', randomRoute)

// router.get('/logout', async (req, res) => {

//     res.render("partials/logout", { nombre: req.session.user.email })

// })


router.get('/', async (req, res) => {
    const user = await req.user;
    if (user) {
        return res.redirect('partials/gestionProducto');
    }
    else {
        return res.sendFile(path.resolve(__dirname, '../public/index.html'));
    }
});

router.get('/profile', auth, async (req, res) => {
    const user = req.user;

    res.render('partials/gestionProducto', { nombre: user.email });
});

router.get('/logout', auth, (req, res, next) => {
    req.logout();
    console.log('Usuario deslogueado');
    res.redirect('/');
});

router.post('/ingreso', (req, res) => {

    console.log(req.body)

    const { usuario, password } = req.body

    const user = users.find(user => user.name === usuario)

    if (!user) return res.redirect('/error')

    req.session.user = user;

    console.log("Usuario de sesion:" + req.session.user)

    req.session.save((err) => {
        if (err) {
            console.log('Error en sesion => ', err)
            res.redirect('/')
        }
    })

    console.log(usuario)

    return res.redirect('/gestionProducto');

});

router.get('/info', (req, res) => {

    res.send(
        {
            'Argumentos de Entrada': config.PORT,
            'Nombre de la plataforma': process.platform,
            'Versión de node.js': process.version,
            'Memoria total reservada (rss)': process.memoryUsage().rss,
            'Path de ejecución': process.argv[1],
            'Process id': process.id,
            'Carpeta del proyecto': process.cwd()

            // process.argv
        }

    )
})

module.exports = router;