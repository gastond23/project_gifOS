//Fetch en JQuery para trending gifs desde GIPHY
let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'
var xhr = $.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6&rating=g`);
xhr.done(function (data) { carrouselGif(data); });

//Tomar desde el DOM el contenedor para los trendings Gifs
let carrouselContenedor = document.getElementById("container_gif");

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
    let menu = document.getElementById("menu");
    if (menuValor == true) {
        menuBurguer.src = "assets/close.svg";
        menu.style.display = "flex";
        menu.style.marginTop = "5em"
        menuValor = false;
        document.getElementById("body").classList.add("no-scroll");
    } else {
        menuValor = true;
        menuBurguer.src = "assets/burger.svg";
        menu.style.marginTop = "-135em"
        menu.style.display = "none";
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
        var buscando = $.get(`https://api.giphy.com/v1/tags/related/${buscar}?api_key=${apiKey}&limit=4&rating=g`);
        buscando.done(function (data) { getData(data); });
    } else {
        listadoSearch.innerHTML = "";
        listadoSearch.classList.remove("menu-activo");
    }
}

//Esta funcion obtiene los valores buscados en GIPHY y los muestra en el DOM, agregando los <li> en el <ul> del buscador
function getData(data) {
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

document.getElementById("buscador").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        listadoSearch.innerHTML = "";
        listadoSearch.classList.remove("menu-activo");
        getBusquedaGiphy();
    }
})

document.getElementById("lupa").addEventListener("click", () => {
    listadoSearch.innerHTML = "";
    listadoSearch.classList.remove("menu-activo");
    getBusquedaGiphy();
});

function getBusquedaGiphy() {
    var busquedaGifs = $.get(`http://api.giphy.com/v1/gifs/search?q=${search.value}&api_key=${apiKey}`);
    busquedaGifs.done(function (data) { muestraBusqueda(data); });
}

function muestraBusqueda(data) {
    search.value = "";
    let valorBusqueda = data.data;
    let sectorBusqueda = document.getElementById("busqueda_section");
    sectorBusqueda.classList.add("busqueda-section");
    let listaGifs = "";
    let btnVerMas = document.createElement("button");
    btnVerMas.classList.add("btn-vermas");
    btnVerMas.innerText = "VER MAS";
    for (let i = 0; i < valorBusqueda.length; i++) {
        let gifElement = valorBusqueda[i];
        listaGifs += `<div class="gif-card"><img class="gif-img" src="${gifElement.images.original.url}"></div>`;
        if (i < (i * 12)) {
            sectorBusqueda.innerHTML = listaGifs;
            sectorBusqueda.appendChild(btnVerMas);
        }
    }
    //sectorBusqueda.innerHTML = listaGifs;
    console.log(sectorBusqueda);
}