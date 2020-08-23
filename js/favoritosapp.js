
let offset = 0;
let limit = 12;
let listadoFavoritos;
let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'
let sectionFavoritos = document.getElementById("section-favoritos");
let btnVerMas = document.createElement("button");
btnVerMas.id = "btn_vermas";
btnVerMas.classList.add("btn-vermas");
btnVerMas.innerText = "VER MAS";
let favoritosEmpty = document.getElementById("favoritos_empty");
let popUp = document.getElementById("overlay");
let datosGiphyMax;
let gifId;
let userName = document.getElementById("user_giphy_title");
let giphyTitle = document.getElementById("giphy_title");
let imgGiphy = document.getElementById("giphy_imagen");
let like = document.getElementById("like_favoritos");
let download = document.getElementById("gif_download");
let dataFavoritos;

getFavoritos();

function getFavoritos() {
    favoritosEmpty.classList.remove("activo");
    const listadoFavoritosTexto = localStorage.getItem("listafavoritosGifos");
    if (listadoFavoritosTexto == '[]' || listadoFavoritosTexto == null) {
        displayNoFavoritos();
    } else {
        listadoFavoritos = JSON.parse(listadoFavoritosTexto);
        let uniqueSet = new Set(listadoFavoritos);
        let uniqueArray = Array.from(uniqueSet);
        listadoFavoritos = uniqueArray;
        let url = `https://api.giphy.com/v1/gifs?ids=${listadoFavoritos.toString()}&api_key=${apiKey}`;
        console.log(url);
        fetchFavoritos(url);
    }
}

function fetchFavoritos(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            muestraFavoritos(data);
        })
        .catch(err => {
            console.error('fetch failed', err);
        })
}

function muestraFavoritos(data) {
    let likeGifs = data.data;
    dataFavoritos = data;
    if (likeGifs.length == 0) {
        displayNoFavoritos();
    } else {
        if (likeGifs.length < limit) {
            for (let i = 0; i < likeGifs.length; i++) {
                let gifElement = likeGifs[i];
                let title = document.createElement("h3");
                let user = document.createElement("h4");
                let contenedorTitulos = document.createElement("div");
                contenedorTitulos.classList.add("datos-gif");
                let newGifCard = document.createElement("div");
                let newCardOver = document.createElement("div");
                let contenedorButtons = document.createElement("div");
                contenedorButtons.classList.add("contenedor-botones");
                gifId = gifElement.id;
                contenedorButtons.innerHTML = `<button class="btn-fav-active" value="${gifElement.id}" onclick="eliminarFavoritos('${gifElement.id}')"><img class="botones-overlay" src="assets/icon-fav-active.svg"></button>
                <button value="${gifElement.id}" onclick="downloadGif('${gifElement.images.original.url}')"><img class="botones-overlay" src="assets/icon-download.svg"></button>
                <button value="${gifElement.id}" onclick="locateGif('${gifId}')"><img class="botones-overlay" src="assets/icon-max.svg"></button>`;
                newCardOver.classList.add("card-mouseover");
                newGifCard.classList.add("gif-card");
                let imgGif = document.createElement("img");
                imgGif.classList.add("gif-img");
                imgGif.src = gifElement.images.original.url;
                imgGif.alt = gifElement.id;
                newGifCard.appendChild(imgGif);
                contenedorTitulos.appendChild(user);
                contenedorTitulos.appendChild(title);
                newCardOver.appendChild(contenedorButtons);
                newCardOver.appendChild(contenedorTitulos);
                user.innerHTML = gifElement.username;
                title.innerHTML = gifElement.title;
                newGifCard.appendChild(newCardOver);
                sectionFavoritos.appendChild(newGifCard);
            }
        } else {
            for (let i = 0; i < limit; i++) {
                let gifElement = likeGifs[i];
                let title = document.createElement("h3");
                let user = document.createElement("h4");
                let contenedorTitulos = document.createElement("div");
                contenedorTitulos.classList.add("datos-gif");
                let newGifCard = document.createElement("div");
                let newCardOver = document.createElement("div");
                let contenedorButtons = document.createElement("div");
                contenedorButtons.classList.add("contenedor-botones");
                gifId = gifElement.id;
                contenedorButtons.innerHTML = `<button class="btn-fav-active" value="${gifElement.id}" onclick="eliminarFavoritos('${gifElement.id}')"><img class="botones-overlay" src="assets/icon-fav-active.svg"></button>
            <button value="${gifElement.id}" onclick="downloadGif('${gifElement.images.original.url}')"><img class="botones-overlay" src="assets/icon-download.svg"></button>
            <button value="${gifElement.id}" onclick="locateGif('${gifId}')"><img class="botones-overlay" src="assets/icon-max.svg"></button>`;
                newCardOver.classList.add("card-mouseover");
                newGifCard.classList.add("gif-card");
                let imgGif = document.createElement("img");
                imgGif.classList.add("gif-img");
                imgGif.src = gifElement.images.original.url;
                imgGif.alt = gifElement.id;
                newGifCard.appendChild(imgGif);
                contenedorTitulos.appendChild(user);
                contenedorTitulos.appendChild(title);
                newCardOver.appendChild(contenedorButtons);
                newCardOver.appendChild(contenedorTitulos);
                user.innerHTML = gifElement.username;
                title.innerHTML = gifElement.title;
                newGifCard.appendChild(newCardOver);
                sectionFavoritos.appendChild(newGifCard);
            }
        }
        if (likeGifs.length > limit) {
            sectionFavoritos.appendChild(btnVerMas);
        }
        console.log(sectionFavoritos);
    }
}

btnVerMas.addEventListener("click", mostrarMasFavoritos);

function mostrarMasFavoritos() {
    debugger;
    limit = limit + limit;
    sectionFavoritos.innerHTML = "";
    muestraFavoritos(dataFavoritos);
}

function displayNoFavoritos() {
    favoritosEmpty.classList.add("activo");
}

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
    popUp.classList.add("active");
    userName.innerText = datosGiphyMax.username;
    giphyTitle.innerText = datosGiphyMax.title;
    imgGiphy.alt = datosGiphyMax.id;
    imgGiphy.src = datosGiphyMax.images.original.url;
    download.download = datosGiphyMax.title;
    download.href = datosGiphyMax.images.original.url;
    document.getElementById("body").classList.add("no-scroll");
}

if (window.matchMedia("(max-width: 500px)").matches) {
    sectionFavoritos.addEventListener("click", function (e) {
        gifId = e.target.alt;
        if (gifId != undefined) {
            locateGif(gifId);
        }
    })
}

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

function slideMaximizedGif(n) {
    let gifList = document.getElementsByClassName("gif-img");
    let position;
    let idSearch = imgGiphy.alt;
    for (let i = 0; i < gifList.length; i++) {
        idSearch = gifList[i].alt;
        if (idSearch == datosGiphyMax.id) {
            position = i + n;
        }
    }
    if (position === undefined) {
        gifList = document.getElementsByClassName("img-gif-slider");
        for (let i = 0; i < gifList.length; i++) {
            idSearch = gifList[i].alt;
            if (idSearch == datosGiphyMax.id) {
                position = i + n;
            }
        }
    }
    if (position < 0) {
        position = gifList.length + position;
    }
    if (position >= gifList.length) {
        position = 0;
    }
    gifId = gifList[position].alt;
    locateGif(gifId);
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

like.addEventListener("click", function (e) {
    e.preventDefault();
    let gifId = imgGiphy.alt;
    eliminarFavoritos(gifId);
});

function actualizarFavoritos(gifId) {
    let favoritosTexto = localStorage.getItem("listafavoritosGifos");//Leo el localStorage si no hay gif favoritos
    if (favoritosTexto == null) { //Si el localstorage esta vacio, declaro vacio el array
        likesFavoritos = [];

    } else {
        likesFavoritos = JSON.parse(favoritosTexto);//Parseamos los datos del localStorage
    }
    likesFavoritos.push(gifId);//Pusheamos el nuevo ID
    favoritosTexto = JSON.stringify(likesFavoritos);//Pasamos a texto los datos del array actualizado
    localStorage.setItem("listafavoritosGifos", favoritosTexto);//Grabamos en localStorage los id de los gifs favoritos
    sectionFavoritos.innerHTML = "";
    getFavoritos();
}

download.addEventListener("click", function (e) {
    e.preventDefault();
    let gifUrl = download.href;
    downloadGif(gifUrl);
})

async function downloadGif(gifUrl) {
    let blob = await fetch(gifUrl).then(r => r.blob());;
    invokeSaveAsDialog(blob, "myGIFO.gif");
}

function eliminarFavoritos(gifId) {
    debugger;
    let listadoFavoritosTexto = localStorage.getItem("listafavoritosGifos");
    listadoFavoritos = JSON.parse(listadoFavoritosTexto);
    console.log(listadoFavoritos);
    let gifToDelete = gifId;
    let idPosition;
    for (let i = 0; i < listadoFavoritos.length; i++) {
        if (gifToDelete == listadoFavoritos[i]) {
            idPosition = i;
        }
    }
    listadoFavoritos.splice(idPosition, 1);
    console.log(listadoFavoritos);
    listadoFavoritosTexto = JSON.stringify(listadoFavoritos);
    localStorage.setItem("listafavoritosGifos", listadoFavoritosTexto);
    sectionFavoritos.innerHTML = "";
    getFavoritos();
}
