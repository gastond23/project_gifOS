let carrouselContenedor = document.getElementById("container_gif");
let limiteBusqueda = 12;


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