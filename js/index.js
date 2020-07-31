//Tomar desde el DOM el contenedor para los trendings Gifs
let carrouselContenedor = document.getElementById("container_gif");
let imgLupa = document.getElementById("lupa_input");
let btnVerMas = document.createElement("button");
btnVerMas.id = "btn_vermas";
let sectorBusqueda = document.getElementById("busqueda_section");
let valorBusqueda = "";
let limiteBusqueda = 12;
let offset = 0;
let ultimaBusqueda;
let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'

function busquedaRandom(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            carrouselGif(data);
        })
        .catch(err => {
            console.error('fetch failed', err);
        })
}

busquedaRandom(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limiteBusqueda}&rating=g`);

//Llamado desde el fetch a la función para mostrar un slider de gifs en DOM
function carrouselGif(data) {
    let arrayGif = data.data;
    let gifSlider = "";
    for (let i = 0; i < arrayGif.length; i++) {
        let gifTrendings = arrayGif[i];
        gifSlider += `<li><img src="${gifTrendings.images.fixed_width.url}" alt="${gifTrendings.title}"></li>`;
    }
    carrouselContenedor.innerHTML = gifSlider;
}

//Control del menu hamburghesa, declaracion de variables
let menuBurguer = document.getElementById("menu_ham");
let menuValor = true;

//Captación del evento click en la imagen del menu hamburguesa
menuBurguer.addEventListener("click", slideMenuHaburguesa);

//Funcion para activar y desactivar la muestra del menu hamburguesa
function slideMenuHaburguesa() {
    if (menuValor == true) {
        menuBurguer.src = "assets/close.svg";
        menuValor = false;
        document.getElementById("body").classList.add("no-scroll");
        document.getElementById("menu").style.display = "flex";
    } else {
        menuValor = true;
        menuBurguer.src = "assets/burger.svg";
        document.getElementById("menu").style.display = "none";
        document.getElementById("body").classList.remove("no-scroll");
    }
}

//Llamado de la función Year para mostrar el año en copyright y que quede siempre actualizado
Year();

//Funcion Year para la muestra del año a traves del objeto Date y la funcion getFullYear
function Year() {
    let d = new Date();
    let n = d.getFullYear();
    document.getElementById("copyright").innerHTML = "&copy; " + n + " All Rights Reserved.";
}

//Declaracion de variables para funcionamiento del buscador
let search = document.getElementById("buscador");
let lupa = document.getElementById("lupa");

//Captura del evento keyup, apenas se modifique el input comienza a buscar valores similares, llama a la funcion busqueda
search.addEventListener("keyup", busqueda);
//lupa.addEventListener("click", busquedaGifs);

//Declaracion de la variable del elemento ul del DOM ubicado despues del input para mostrar los valores similares buscados
let listadoSearch = document.getElementById("lista_search");

//Funcion busqueda, capta el valor del input del dom e inserta los <li> mostrando los valores similares en GIPHY
function busqueda() {
    let buscar = search.value;
    //Si en el input no hay nada escrito deja vacio el <ul> y quita la clase menu-activo para no modificar el DOM, si no realiza la busqueda
    if (buscar.length > 0) {
        return fetch(`https://api.giphy.com/v1/tags/related/${buscar}?api_key=${apiKey}&limit=4&rating=g`)
            .then(response => response.json())
            .then(data => {
                getData(data);
            })
            .catch(err => {
                console.error('fetch failed', err);
            })
    } else {
        listadoSearch.innerHTML = "";
        listadoSearch.classList.remove("menu-activo");
    }
}

//Esta funcion obtiene los valores buscados en GIPHY y los muestra en el DOM, agregando los <li> en el <ul> del buscador
function getData(data) {
    imgLupa.src = "assets/close.svg";
    listadoSearch.classList.add("menu-activo");
    let datoBusqueda = data.data;
    listadoSearch.innerHTML = `<li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[0].name}</li>
    <li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[1].name}</li>
    <li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[2].name}</li>
    <li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[3].name}</li>`;
}

//Capturar el evento click de la lista creada con sugerencias para el autocompletado
document.getElementById("lista_search").addEventListener("click", function (e) {
    search.value = e.target.textContent;
    listadoSearch.innerHTML = "";
    listadoSearch.classList.remove("menu-activo");
})

//Llamado de funcion desde un click en lupa o enter

document.getElementById("buscador").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        getBusquedaGiphy();
    }
})

document.getElementById("lupa").addEventListener("click", () => {
    getBusquedaGiphy();
});

function getBusquedaGiphy(ultimaBusqueda) {
    imgLupa.src = "assets/icon-search.svg";
    if (ultimaBusqueda == undefined) {
        offset = 0;
        return fetch(`https://api.giphy.com/v1/gifs/search?q=${search.value}&api_key=${apiKey}&limit=${limiteBusqueda}&offset=${offset}`)
            .then(response => response.json())
            .then(data => {
                muestraBusqueda(data);
            })
            .catch(err => {
                console.error('fetch failed', err);
            })
    } else {
        return fetch(`https://api.giphy.com/v1/gifs/search?q=${ultimaBusqueda}&api_key=${apiKey}&limit=${limiteBusqueda}&offset=${offset}`)
            .then(response => response.json())
            .then(data => {
                recargaBusqueda(data);
            })
            .catch(err => {
                console.error('fetch failed', err);
            })
    }
}

function muestraBusqueda(data) {
    listadoSearch.innerHTML = "";
    listadoSearch.classList.remove("menu-activo");
    ultimaBusqueda = search.value;
    search.value = "";
    console.log(data.data);
    valorBusqueda = data.data;
    sectorBusqueda.classList.add("busqueda-section");
    sectorBusqueda.innerHTML = "";
    btnVerMas.classList.add("btn-vermas");
    btnVerMas.innerText = "VER MAS";
    btnVerMas.remove();
    if (valorBusqueda.length <= limiteBusqueda) {
        for (let i = 0; i < valorBusqueda.length; i++) {
            let gifElement = valorBusqueda[i];
            let newGifCard = document.createElement("div");
            newGifCard.classList.add("gif-card");
            let imgGif = document.createElement("img");
            imgGif.classList.add("gif-img");
            imgGif.src = gifElement.images.original.url;
            newGifCard.appendChild(imgGif);
            sectorBusqueda.appendChild(newGifCard);
            sectorBusqueda.appendChild(btnVerMas);
        }
    } else {
        for (let i = 0; i < valorBusqueda.length; i++) {
            let gifElement = valorBusqueda[i];
            let newGifCard = document.createElement("div");
            newGifCard.classList.add("gif-card");
            let imgGif = document.createElement("img");
            imgGif.classList.add("gif-img");
            imgGif.src = gifElement.images.original.url;
            newGifCard.appendChild(imgGif);
            sectorBusqueda.appendChild(newGifCard);
        }
    }
    console.log(sectorBusqueda);
}

btnVerMas.addEventListener("click", verMas);

function verMas() {
    offset++;
    offset = offset + limiteBusqueda;
    console.log(offset);
    getBusquedaGiphy(ultimaBusqueda);
}

function recargaBusqueda(data) {
    sectorBusqueda.removeChild(btnVerMas);
    valorBusqueda = data.data;
    if (valorBusqueda.length <= limiteBusqueda) {
        for (let i = 0; i < valorBusqueda.length; i++) {
            let gifElement = valorBusqueda[i];
            let newGifCard = document.createElement("div");
            newGifCard.classList.add("gif-card");
            let imgGif = document.createElement("img");
            imgGif.classList.add("gif-img");
            imgGif.src = gifElement.images.original.url;
            newGifCard.appendChild(imgGif);
            sectorBusqueda.appendChild(newGifCard);
        }
        sectorBusqueda.appendChild(btnVerMas);
    } else {
        for (let i = 0; i < valorBusqueda.length; i++) {
            let gifElement = valorBusqueda[i];
            let newGifCard = document.createElement("div");
            newGifCard.classList.add("gif-card");
            let imgGif = document.createElement("img");
            imgGif.src = gifElement.images.original.url;
            newGifCard.appendChild(imgGif);
            sectorBusqueda.appendChild(newGifCard);
        }
    }
}


function trendingsSug(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            muestraTrendings(data);
        })
        .catch(err => {
            console.error('fetch failed', err);
        })
}

trendingsSug(`https://api.giphy.com/v1/trending/searches?api_key=${apiKey}&limit=5&rating=g`);

function muestraTrendings(data) {
    debugger;
    let trendings = data.data;
    let listaTrending = document.getElementById("trendings_sug");
    listaTrending.classList.add("container-li");
    for (let i = 0; i < 5; i++) {
        let nuevoLiTrending = document.createElement("li");
        let itemTrending = trendings[i];
        listaTrending.appendChild(nuevoLiTrending);
        nuevoLiTrending.innerHTML = itemTrending;
    }
    console.log(listaTrending);
}