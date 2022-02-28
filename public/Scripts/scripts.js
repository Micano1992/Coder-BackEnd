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
    makeHtmlTable(productos).then(html => {

        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('views/partials/tablaProductos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            let hayProductos = productos.length
            const html = template({ hayProductos, productos })
            return html
        })
}