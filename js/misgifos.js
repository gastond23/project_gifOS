let offset = 0;
let limit = 12;
let listadoMisGifos;
let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'
let sectionMisGifos = document.getElementById("section_misgifos");
let btnVerMas = document.createElement("button");
btnVerMas.id = "btn_vermas";
btnVerMas.classList.add("btn-vermas");
btnVerMas.innerText = "VER MAS";
let misGifosEmpty = document.getElementById("misgifos_empty");
let popUp = document.getElementById("overlay");
let datosGiphyMax;
let gifId;
let userName = document.getElementById("user_giphy_title");
let giphyTitle = document.getElementById("giphy_title");
let imgGiphy = document.getElementById("giphy_imagen");
let like = document.getElementById("like_favoritos");
let download = document.getElementById("gif_download");
let dataMisGifos;

getMisGifos();

function displaySinMisGifos() {
    misGifosEmpty.classList.add("activo");
}

function getMisGifos() {
    misGifosEmpty.classList.remove("activo");
    const listadoGifosTexto = localStorage.getItem("misGIFOS");
    if (listadoGifosTexto == '[]' || listadoGifosTexto == null) {
        displaySinMisGifos();
    } else {
        listadoMisGifos = JSON.parse(listadoGifosTexto);
        let uniqueSet = new Set(listadoMisGifos);
        let uniqueArray = Array.from(uniqueSet);
        listadoMisGifos = uniqueArray;
        let url = `https://api.giphy.com/v1/gifs?ids=${listadoMisGifos.toString()}&api_key=${apiKey}`;
        fetchMisGifos(url);
    }
}

function fetchMisGifos(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            muestraMisGifos(data);
        })
        .catch(err => {
            console.error('fetch failed', err);
        })
}

function muestraMisGifos(data) {
    let miGifos = data.data;
    dataMisGifos = data;
    if (miGifos.length == 0) {
        displaySinMisGifos();
    } else {
        if (miGifos.length < limit) {
            for (let i = 0; i < miGifos.length; i++) {
                let gifElement = miGifos[i];
                let title = document.createElement("h3");
                let user = document.createElement("h4");
                let contenedorTitulos = document.createElement("div");
                contenedorTitulos.classList.add("datos-gif");
                let newGifCard = document.createElement("div");
                let newCardOver = document.createElement("div");
                let contenedorButtons = document.createElement("div");
                contenedorButtons.classList.add("contenedor-botones");
                gifId = gifElement.id;
                contenedorButtons.innerHTML = `<button class="btn-delete-active" value="${gifElement.id}" onclick="eliminarMiGifo('${gifElement.id}')"><img class="botones-overlay" src="assets/icon_trash.svg"></button>
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
                sectionMisGifos.appendChild(newGifCard);
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
                sectionMisGifos.appendChild(newGifCard);
            }
        }
        if (miGifos.length > limit) {
            sectionMisGifos.appendChild(btnVerMas);
        }
        console.log(sectionMisGifos);
    }
}

btnVerMas.addEventListener("click", mostrarMasMisGifos);

function mostrarMasMisGifos() {
    limit = limit + limit;
    sectionMisGifos.innerHTML = "";
    muestraMisGifos(dataMisGifos);
}

function eliminarMiGifo(id) {
    let listadoGifosTexto = localStorage.getItem("misGIFOS");
    listadoMisGifos = JSON.parse(listadoGifosTexto);
    let gifDelete = id;
    let idPosition;
    for (let i = 0; i < listadoMisGifos; i++) {
        if (gifDelete == listadoMisGifos[i]) {
            idPosition = i;
        }
    }
    listadoMisGifos.splice(idPosition, 1);
    listadoGifosTexto = JSON.stringify(listadoMisGifos);
    localStorage.setItem("misGIFOS", listadoGifosTexto);
    sectionMisGifos.innerHTML = "";
    getMisGifos();
}