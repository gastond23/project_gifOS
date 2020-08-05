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
let buscando;
let popUp = document.getElementById("overlay");
let datosGiphyMax;
let gifId;
let userName = document.getElementById("user_giphy_title");
let giphyTitle = document.getElementById("giphy_title");
let imgGiphy = document.getElementById("giphy_imagen");
let like = document.getElementById("like_favoritos");
let download = document.getElementById("gif_download");
let lupaOculta = document.getElementById("lupa_oculta");
let likesFavoritos = [];
let listaTrending = document.getElementById("trendings_sug");

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
    for (let i = 0; i < arrayGif.length; i++) {
        let gifTrendings = arrayGif[i];
        let imgTrenfGif = document.createElement("img");
        imgTrenfGif.src = gifTrendings.images.original.url;
        imgTrenfGif.alt = gifTrendings.id;
        imgTrenfGif.classList.add("img-gif-slider");
        carrouselContenedor.appendChild(imgTrenfGif);
    }
    console.log(carrouselContenedor);
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
    if (search.value != null) {
        imgLupa.src = "assets/close.svg";
        listadoSearch.classList.add("menu-activo");
        lupaOculta.classList.add("lupavisible");
        let datoBusqueda = data.data;
        listadoSearch.innerHTML = `<li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[0].name}</li>
        <li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[1].name}</li>
        <li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[2].name}</li>
        <li class="item"><svg><use href="assets/icon-search.svg#path-1"></use></svg>${datoBusqueda[3].name}</li>`;
    } else {
        listadoSearch.innerHTML = "";
        lupaOculta.classList.remove("lupavisible");
        listadoSearch.classList.remove("menu-activo");
        imgLupa.src = "assets/icon-search.svg";
    }
}

//Capturar el evento click de la lista creada con sugerencias para el autocompletado
document.getElementById("lista_search").addEventListener("click", function (e) {
    lupaOculta.classList.remove("lupavisible");
    search.value = e.target.textContent;
    buscando = search.value;
    imgLupa.src = "assets/icon-search.svg";
    listadoSearch.innerHTML = "";
    listadoSearch.classList.remove("menu-activo");
})

//Llamado de funcion desde un click en lupa o enter

document.getElementById("buscador").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        buscando = search.value;
        getBusquedaGiphy();
    }
});

document.getElementById("lupa").addEventListener("click", () => {
    getBusquedaGiphy();
});

function getBusquedaGiphy(ultimaBusqueda) {
    if (ultimaBusqueda == undefined) {
        offset = 0;
        return fetch(`https://api.giphy.com/v1/gifs/search?q=${buscando}&api_key=${apiKey}&limit=${limiteBusqueda}&offset=${offset}`)
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
    lupaOculta.classList.remove("lupavisible");
    ultimaBusqueda = buscando
    listadoSearch.innerHTML = "";
    listadoSearch.classList.remove("menu-activo");
    imgLupa.src = "assets/icon-search.svg";
    search.value = "";
    valorBusqueda = data.data;
    console.log(valorBusqueda)
    if (valorBusqueda.length == 0) {
        displayBusquedaError();
    } else {
        let tituloBusqueda = document.createElement("h2");
        tituloBusqueda.classList.add("title-search")
        tituloBusqueda.innerText = ultimaBusqueda;
        sectorBusqueda.classList.add("busqueda-section");
        sectorBusqueda.innerHTML = "";
        btnVerMas.classList.add("btn-vermas");
        btnVerMas.innerText = "VER MAS";
        btnVerMas.remove();
        sectorBusqueda.appendChild(tituloBusqueda);
        if (valorBusqueda.length == limiteBusqueda) {
            for (let i = 0; i < valorBusqueda.length; i++) {
                let gifElement = valorBusqueda[i];
                let title = document.createElement("h3");
                let user = document.createElement("h4");
                let newGifCard = document.createElement("div");
                let newCardOver = document.createElement("div");
                newCardOver.classList.add("card-mouseover");
                newGifCard.classList.add("gif-card");
                let imgGif = document.createElement("img");
                imgGif.classList.add("gif-img");
                imgGif.src = gifElement.images.original.url;
                imgGif.alt = gifElement.id;
                newGifCard.appendChild(imgGif);
                newCardOver.appendChild(user);
                newCardOver.appendChild(title);
                user.innerHTML = gifElement.username;
                title.innerHTML = gifElement.title;
                newGifCard.appendChild(newCardOver);
                sectorBusqueda.appendChild(newGifCard);
                sectorBusqueda.appendChild(btnVerMas);
            }
        } else {
            for (let i = 0; i < valorBusqueda.length; i++) {
                let gifElement = valorBusqueda[i];
                let title = document.createElement("h3");
                let user = document.createElement("h4");
                let newGifCard = document.createElement("div");
                let newCardOver = document.createElement("div");
                newCardOver.classList.add("card-mouseover");
                newGifCard.classList.add("gif-card");
                let imgGif = document.createElement("img");
                imgGif.classList.add("gif-img");
                imgGif.src = gifElement.images.original.url;
                imgGif.alt = gifElement.id;
                newGifCard.appendChild(imgGif);
                newCardOver.appendChild(user);
                newCardOver.appendChild(title);
                user.innerHTML = gifElement.username;
                title.innerHTML = gifElement.title;
                newGifCard.appendChild(newCardOver);
                sectorBusqueda.appendChild(newGifCard);
            }
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
            let title = document.createElement("h3");
            let user = document.createElement("h4");
            let newGifCard = document.createElement("div");
            let newCardOver = document.createElement("div");
            newCardOver.classList.add("card-mouseover");
            newGifCard.classList.add("gif-card");
            let imgGif = document.createElement("img");
            imgGif.classList.add("gif-img");
            imgGif.src = gifElement.images.original.url;
            imgGif.alt = gifElement.id;
            newGifCard.appendChild(imgGif);
            newCardOver.appendChild(user);
            newCardOver.appendChild(title);
            user.innerHTML = gifElement.username;
            title.innerHTML = gifElement.title;
            newGifCard.appendChild(newCardOver);
            sectorBusqueda.appendChild(newGifCard);
        }
        sectorBusqueda.appendChild(btnVerMas);
    } else {
        for (let i = 0; i < valorBusqueda.length; i++) {
            let gifElement = valorBusqueda[i];
            let title = document.createElement("h3");
            let user = document.createElement("h4");
            let newGifCard = document.createElement("div");
            let newCardOver = document.createElement("div");
            newCardOver.classList.add("card-mouseover");
            newGifCard.classList.add("gif-card");
            let imgGif = document.createElement("img");
            imgGif.classList.add("gif-img");
            imgGif.src = gifElement.images.original.url;
            imgGif.alt = gifElement.id;
            newGifCard.appendChild(imgGif);
            newCardOver.appendChild(user);
            newCardOver.appendChild(title);
            user.innerHTML = gifElement.username;
            title.innerHTML = gifElement.title;
            newGifCard.appendChild(newCardOver);
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
    let trendings = data.data;
    listaTrending.classList.add("container-li");
    for (let i = 0; i < 5; i++) {
        let nuevoLiTrending = document.createElement("li");
        let itemTrending = trendings[i];
        listaTrending.appendChild(nuevoLiTrending);
        nuevoLiTrending.innerHTML = itemTrending;
    }
    console.log(listaTrending);
}

listaTrending.addEventListener("click", function (e) {
    buscando = e.target.innerHTML;
    getBusquedaGiphy();
})


function displayBusquedaError() {
    sectorBusqueda.innerHTML = "";
    let sinResultadosContainer = document.createElement("div");
    sinResultadosContainer.classList.add("result-container");
    let busquedaTitle = document.createElement("h2");
    busquedaTitle.classList.add("title-search")
    busquedaTitle.innerText = "Lorem Ipsum"
    let imgResultadoBusqueda = document.createElement("img");
    imgResultadoBusqueda.src = "assets/icon-busqueda-sin-resultado.svg";
    let underTitleSearch = document.createElement("h3");
    underTitleSearch.classList.add("under-title");
    underTitleSearch.innerText = "Intenta con otra búsqueda.";
    sinResultadosContainer.appendChild(busquedaTitle);
    sinResultadosContainer.appendChild(imgResultadoBusqueda);
    sinResultadosContainer.appendChild(underTitleSearch);
    sectorBusqueda.classList.add("busqueda-section");
    sectorBusqueda.appendChild(sinResultadosContainer);
    console.log(sectorBusqueda);
}

sectorBusqueda.addEventListener("click", function (e) {
    gifId = e.target.alt;
    if (gifId != undefined) {
        popUp.classList.add("active");
        locateGif(gifId);
    }
})

carrouselContenedor.addEventListener("click", function (e) {
    gifId = e.target.alt;
    if (gifId != undefined) {
        popUp.classList.add("active");
        locateGif(gifId);
    }
})

function locateGif(gifId) {
    return fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            maximizarGif(data);
        })
        .catch(err => {
            console.error('fetch failed', err);
        })
}

function maximizarGif(data) {
    gifId = "";
    datosGiphyMax = data.data;
    userName.innerText = datosGiphyMax.username;
    giphyTitle.innerText = datosGiphyMax.title;
    imgGiphy.alt = datosGiphyMax.id;
    imgGiphy.src = datosGiphyMax.images.original.url;
    download.download = datosGiphyMax.title;
    download.href = datosGiphyMax.images.original.url;
    console.log(download);
    document.getElementById("body").classList.add("no-scroll");
}

let closePopUp = document.getElementById("close_popup");
closePopUp.addEventListener("click", () => {
    datosGiphyMax = "";
    popUp.classList.remove("active");
    userName.innerText = "";
    giphyTitle.innerText = "";
    imgGiphy.src = "";
    document.getElementById("body").classList.remove("no-scroll");
})

like.addEventListener("click", actualizarFavoritos);

function actualizarFavoritos() {
    debugger;
    let gifId = imgGiphy.alt;
    let favoritosTexto = localStorage.getItem("listafavoritosGifos");
    if (favoritosTexto == null) {
        likesFavoritos = [];

    } else {
        likesFavoritos = JSON.parse(favoritosTexto);
    }
    likesFavoritos.push(gifId);
    console.log(likesFavoritos);
    favoritosTexto = JSON.stringify(likesFavoritos);
    localStorage.setItem("listafavoritosGifos", favoritosTexto);
}
