const express = require('express')
const apiRoutes = require('./routers/index')

const PORT = process.env.PORT || 8081


const app = express()

//Middleware

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.set('views', './views');
app.set('view engine', 'ejs');


//Routes

app.use('/', apiRoutes)


const connectedServer = app.listen(PORT, () => { console.log(`Server conectado con puerto ${PORT}`) })

connectedServer.on('error', (error) => { console.log(error.message) })


