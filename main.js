'use strict'

const publicaciones = document.getElementById('publicaciones')
const documentFragment = document.createDocumentFragment()
let contador = 0;

const crearEstructuraPublicacion = (name, content) => {
    const container = document.createElement('div')
    const h3 = document.createElement('h3')
    const texto = document.createElement('p')
    const comentarios = document.createElement('div')
    const inputComentario = document.createElement('input')
    const inputBtnSend = document.createElement('input')


    container.classList.add("publicacion")
    h3.classList.add('titulo')
    texto.classList.add('texto')
    comentarios.classList.add("comentarios")
    inputComentario.classList.add('comentario')
    inputBtnSend.classList.add('btnSend')

    inputComentario.setAttribute("placeholder", "Introducí un comentario")
    inputBtnSend.setAttribute("type", "submit")
    h3.textContent = name
    texto.textContent = content
    comentarios.appendChild(inputComentario)
    comentarios.appendChild(inputBtnSend)

    container.appendChild(h3)
    container.appendChild(texto)
    container.appendChild(comentarios)

    return container
}

const cargarMasPublicaciones = entry => {
    if (entry[0].isIntersecting) cargarPublicaciones(4)
}

const observer = new IntersectionObserver(cargarMasPublicaciones)


const cargarPublicaciones = async num => {
    const request = await fetch('contenido.txt')
    const content = await request.json()
    const arr = content.content
    for (let i = 0; i < num; i++) {
        if (arr[contador] !== undefined) {
            const publicacion = crearEstructuraPublicacion(arr[contador].nombre, arr[contador].contenido)
            documentFragment.appendChild(publicacion)
            contador++
            if (i == num-1) observer.observe(publicacion)
        } else {
            if(publicaciones.lastElementChild.id !== "noMore"){
                let noMore = document.createElement('h4')
                noMore.textContent = "No hay mas publicaciones"
                noMore.id = "noMore"
                documentFragment.appendChild(noMore)
                publicaciones.appendChild(documentFragment)
                break;
            }
        }
    }
    publicaciones.appendChild(documentFragment)
}

cargarPublicaciones(4)