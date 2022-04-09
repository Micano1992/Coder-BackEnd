const express = require('express')
const http = require('http')
const socketIo = require('socket.io');
const dbconfig = require('./db/config');
const apiRoutes = require('./routes/index');
const { engine } = require('express-handlebars');
const { ENV: { PORT } } = require('./config');
const { normalize, schema } = require('normalizr')




// const contenedorProducto = require('./models/productos/contenedorProductos')
// const contenedorMensaje = require('./models/chat/contenedorChat')


//Instancia servidor, socket y api

const app = express()
const serverHttp = http.createServer(app)
const io = socketIo(serverHttp)

// const productosApi = new contenedorProducto(dbconfig.mariaDB, 'productos')
// const mensajesApi = new contenedorMensaje(dbconfig.sqlite, 'mensajes')

const productoControllers = require('./controllers/productosControllers')
const chatControllers = require('./controllers/chatControllers')

//-------------------


//Middleware

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./public/views");

app.use('/', apiRoutes)

//--------------------

//Configuración socket

io.on('connection', async (socket) => {
    console.log('Se conecto un nuevo cliente: ', socket.id)

    //Carga inicial productos

    const data = await (await productoControllers.getAllProducts()).products

    socket.emit('getProductos', data)


    //alta de producto

    socket.on('createProducto', (req) => {

        productoControllers.createProduct(req)
            .then((nuevoId) => {
                console.log('Se generó el id: ', nuevoId)
            })
            .then(async () => { io.sockets.emit('getProductos', await (await productoControllers.getAllProducts()).products) })
    });

    // carga inicial de mensajes

    let chatGetAll = await (await chatControllers.getAllChat()).Chat

    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });

    const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

    const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

    const normalizedChat = normalize({ id: 'mensajes', mensajes: chatGetAll }, schemaMensajes)


    console.log(JSON.stringify(chatGetAll).length)
    console.log(JSON.stringify(normalizedChat).length)

    const comprension = JSON.stringify(normalizedChat).length / JSON.stringify(chatGetAll).length * 100


    socket.emit('getMensajes', { comprension: comprension, mensajes: normalizedChat });

    // actualizacion de mensajes
    socket.on('createMensaje', (req) => {
        console.log(req)
        req.fecha = new Date().toLocaleString()
        chatControllers.createChat(req)
            .then((nuevoId) => {
                console.log('Se generó el id mensaje: ', nuevoId)
            })
            .then(async () => {

                let chatGetAll = await (await chatControllers.getAllChat()).Chat

                const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });

                const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

                const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

                const normalizedChat = normalize({ id: 'mensajes', mensajes: chatGetAll }, schemaMensajes)

                const comprension = JSON.stringify(normalizedChat).length / JSON.stringify(chatGetAll).length * 100

                io.sockets.emit('getMensajes', { comprension: comprension, mensajes: normalizedChat })
            })
    });


})

//-------------------

//Inicio servidor

serverHttp.listen(PORT, () => {
    console.log("Server is up and runnion on port ", PORT)
})

serverHttp.on('error', (error) => { console.log(error.message) })
//-------------------


