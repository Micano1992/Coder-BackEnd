const express = require('express')
const apiRoutes = require('./routers/index')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io');

const contenedorProducto = require('./models/productos/contenedorProductos')
const contenedorMensaje = require('./models/chat/contenedorChat')


//Instancia servidor, socket y api

const app = express()
const serverHttp = http.createServer(app)
const io = socketIo(serverHttp)

const productosApi = new contenedorProducto()
const mensajesApi = new contenedorMensaje()

//-------------------


//Middleware

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-------------------

//Configuracion habdlebars

// app.engine(
//     "hbs",
//     engine({
//         extname: ".hbs",
//         defaultLayout: 'index.hbs',
//         layoutsDir: path.resolve(__dirname, 'views/layouts'),
//         partialsDir: path.resolve(__dirname, 'views/partials')

//     })
// );
// app.set("view engine", "hbs");
// app.set("views", ".views");

//-------------------

//Routes

// app.use('/', apiRoutes)


//Configurar socket

io.on('connection', async (socket) => {
    console.log('Se conecto un nuevo cliente: ', socket.id)

    //Carga inicial productos

    socket.emit('getProductos', await productosApi.getAll())


    //alta de producto

    socket.on('createProducto', (data) => {
        productosApi.save(data)
            .then((nuevoId) => {
                console.log('Se generó el id: ', nuevoId)

                io.sockets.emit('getProductos', productosApi.getAll())
            })
    });

    // carga inicial de mensajes
    socket.emit('mensajes', await mensajesApi.listarAll());

    // actualizacion de mensajes
    socket.on('createMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.listarAll());
    })


})

//-------------------

//Inicio servidor

const PORT = process.env.PORT || 8081

serverHttp.listen(PORT, () => {
    console.log("Server is up and runnion on port ", PORT)
})

serverHttp.on('error', (error) => { console.log(error.message) })
//-------------------


