'use strict'

const peliculas = document.getElementById('peliculas')
const documentFragment = document.createDocumentFragment()
const avengers = document.getElementById('avengers')
const dc = document.getElementById('dc')
const taquilleras = document.getElementById('taquilleras')
let contador = 0;


avengers.addEventListener('click', () => cargarPeliculas(4, 1))
dc.addEventListener('click', () => cargarPeliculas(4, 3))
taquilleras.addEventListener('click', () => cargarPeliculas(4, 10))

const crearEstructuraPelicula = (titulo, img, descripcion) => {

    const container = document.createElement('div')
    const h3 = document.createElement('h3')
    const imagen = document.createElement('img')

    imagen.classList.add('imagen')
    imagen.setAttribute('title', `${descripcion}`)
    imagen.setAttribute('src', `${img}`)
    container.classList.add("publicacion")
    h3.classList.add('titulo')
    h3.textContent = titulo

    container.appendChild(h3)
    container.appendChild(imagen)
    return container
}

const cargarMasPeliculas = (entry) => {
    if (entry[0].isIntersecting) cargarPeliculas(4)
}

const observer = new IntersectionObserver(cargarMasPeliculas)

const cargarPeliculas = async (num, id) => {
    const api = fetch(`https://api.themoviedb.org/4/list/${id}?api_key=c978e7aae993c105bd08d83ddf603d6e&language=es`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTc4ZTdhYWU5OTNjMTA1YmQwOGQ4M2RkZjYwM2Q2ZSIsInN1YiI6IjYxZmM1YTFiNjg5MjljMDBhNDg1ZTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wsswZMRzrZf9YekBi7H32dwGrjfAnCFPD3P2xxmfODY',
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    let request = await api
    let data = await request.json()
    const arr = data.results
    console.log(data)
    for (let i = 0; i < num; i++) {
        if (arr[contador] !== undefined) {
            const url = arr[contador].poster_path
            const img = `https://image.tmdb.org/t/p/w500/${url}`
            const titulo = arr[contador].title
            const descripcion = arr[contador].overview
            const pelicula = crearEstructuraPelicula(titulo, img, descripcion)
            documentFragment.appendChild(pelicula)
            contador++
            if(i == num - 2) observer.observe(pelicula)
        } else{
            if(peliculas.lastElementChild.id !== "noMore"){
                let noMore = document.createElement('h4')
                noMore.textContent = "No hay mas peliculas para mostrar"
                noMore.id = "noMore"
                documentFragment.appendChild(noMore)
                peliculas.appendChild(documentFragment)
                break;
            }
        }
    }
    peliculas.appendChild(documentFragment)
}

cargarPeliculas(4, 1)