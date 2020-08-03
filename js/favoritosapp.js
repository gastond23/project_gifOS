
let offset = 0;
let limit = 12;
let listadoFavoritos;
let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'
let sectionFavoritos = document.getElementById("section-favoritos");
let btnVerMas = document.createElement("button");
btnVerMas.id = "btn_vermas";
btnVerMas.classList.add("btn-vermas");
btnVerMas.innerText = "VER MAS";

getFavoritos();

function getFavoritos() {
    const listadoFavoritosTexto = localStorage.getItem("listafavoritosGifos");
    listadoFavoritos = JSON.parse(listadoFavoritosTexto);
    let url = `https://api.giphy.com/v1/gifs?ids=${listadoFavoritos.toString()}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;
    fetchFavoritos(url);
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
    debugger;
    let likeGifs = data.data;
    if (likeGifs.length == 0) {
        displayNoFavoritos();
    } else {
        if (likeGifs.length == limit) {
            for (let i = 0; i < likeGifs.length; i++) {
                let gifElement = likeGifs[i];
                let newGifCard = document.createElement("div");
                newGifCard.classList.add("gif-card");
                let imgGif = document.createElement("img");
                imgGif.classList.add("gif-img");
                imgGif.src = gifElement.images.original.url;
                imgGif.alt = gifElement.id;
                newGifCard.appendChild(imgGif);
                sectionFavoritos.appendChild(newGifCard);
            }
            sectionFavoritos.appendChild(btnVerMas);
        } else {
            for (let i = 0; i < likeGifs.length; i++) {
                let gifElement = likeGifs[i];
                let newGifCard = document.createElement("div");
                newGifCard.classList.add("gif-card");
                let imgGif = document.createElement("img");
                imgGif.classList.add("gif-img");
                imgGif.src = gifElement.images.original.url;
                imgGif.alt = gifElement.title;
                newGifCard.appendChild(imgGif);
                sectionFavoritos.appendChild(newGifCard);
            }
        }
    }
}