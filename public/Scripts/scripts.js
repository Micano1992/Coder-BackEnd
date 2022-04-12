const socket = io.connect();

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });

// Definimos un esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' })

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })


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


//Socket mensajes

const inputMail = document.getElementById('inputMail')
const inputNombre = document.getElementById('inputNombre')
const inputApellido = document.getElementById('inputApellido')
const inputEdad = document.getElementById('inputEdad')
const inputAlias = document.getElementById('inputAlias')
const inputAvatar = document.getElementById('inputAvatar')
const inputMensaje = document.getElementById('inputMensaje')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const mensaje = { author: { id: inputMail.value, nombre: inputNombre.value, apellido: inputApellido.value, edad: inputEdad.value, alias: inputAlias.value, avatar: inputAvatar.value }, texto: inputMensaje.value, }
    socket.emit('createMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('getMensajes', mensajes => {

    const mensajesD = normalizr.denormalize(mensajes.mensajes.result, schemaMensajes, mensajes.mensajes.entities)

    const html = makeHtmlList(mensajesD.mensajes)
    document.getElementById('mensajes').innerHTML = html;
    document.getElementById('comprensionMensajes').innerHTML = `<h4> (Comprensión: ${parseInt(mensajes.comprension)} %) </h4>`;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            
            <div style="background-color: white; padding: 10px">
                <b style="color:blue;">${mensaje.author.alias}</b>
                [<span style="color:brown;">${mensaje.fecha}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputNombre.addEventListener('input', () => {
    const hayEmail = inputMail.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})

