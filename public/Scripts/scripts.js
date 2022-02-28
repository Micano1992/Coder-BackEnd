const socket = io.connect();

const formAltaProducto = document.getElementById('formularioAlta')
formAltaProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        nombre: formAltaProducto[0].value,
        precio: formAltaProducto[1].value,
        imagen: formAltaProducto[2].value,
    }

    socket.emit('createProducto', producto);
    formAltaProducto.reset();
})

socket.on('getProductos', productos => {
    return fetch('views/partials/index.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            hayProductos = productos.lenght
            const html = template({ productos, hayProductos })
            return html
        })
})