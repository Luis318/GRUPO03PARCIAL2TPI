const url = 'https://retoolapi.dev/Iqy5HI/data'
const contenedor = document.querySelector('data')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const id = document.querySelector('id')
const nombre = document.getElementById('nombre')
const foto = document.getElementById('foto')
const precio = document.getElementById('precio')
const descripcion = document.getElementById('descripcion')
const categoria = document.getElementById('categoria')
const video = document.getElementById('video')
const cantidad = document.getElementById('cantidad')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombre.value = ''
    foto.value = ''
    precio.value = ''
    descripcion.value = ''
    categoria.value = ''
    video.value = ''
    cantidad.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))
const mostrarData = (data) => {
    console.log(data)
    let body = ''
    for (let i = 0; i < data.length; i++) {
        body += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].nombre}</td>
        <td><img src='${data[i].imagen}' width='150' height='150'></td>
        <td>${data[i].precio}</td>
        <td>${data[i].descripcion}</td>
        <td>${data[i].categoria}</td>
        <td><iframe width="240" height="160" src="${data[i].video}"></iframe></td>
        <td>${data[i].cantidad}</td>
        <td width="190"><a class="btnEditar btn btn-primary">Editar</a>
        <a class="btnBorrar btn btn-danger">Eliminar</a></td>
        </tr>`
    }
    document.getElementById('data').innerHTML = body
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML


    function confirmDelete() {
        var respuesta = confirm("Estas seguro?");
        if (respuesta == true) {
            fetch(`https://retoolapi.dev/Iqy5HI/data/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
        }
        else {
            iziToast.error({
                title: 'Error',
                message: 'Operacion Cancelada',
            });
        }
    }
    confirmDelete();
})
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const fotoForm = fila.children[2].innerHTML
    const precioForm = fila.children[3].innerHTML
    const descripcionForm = fila.children[4].innerHTML
    const categoriaForm = fila.children[5].innerHTML
    const videoForm = fila.children[6].innerHTML
    const cantidadForm = fila.children[7].innerHTML
    nombre.value = nombreForm
    foto.value = fotoForm
    precio.value = precioForm
    descripcion.value = descripcionForm
    categoria.value = categoriaForm
    video.value = videoForm
    cantidad.value = cantidadForm
    opcion = 'editar'
    modalArticulo.show()
})
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {
        //console.log('Opcion Crear')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                foto: foto.value,
                precio: precio.value,
                descripcion: descripcion.value,
                categoria: categoria.value,
                video: video.value,
                cantidad: cantidad.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoArticulo = []
                nuevoArticulo.push(data)
                mostrarData(nuevoArticulo)
            })
    }
    if (opcion == 'editar') {
        fetch(`https://retoolapi.dev/Iqy5HI/data/${idForm}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                foto: foto.value,
                precio: precio.value,
                descripcion: descripcion.value,
                categoria: categoria.value,
                video: video.value,
                cantidad: cantidad.value
            })
        })
            .then(response => response.json())
            .then( response => location.reload() )
    }
    modalArticulo.hide()
})