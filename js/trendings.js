let carrouselContenedor = document.getElementById("container_gif");
let limiteBusqueda = 12;
let count = 0;

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
    displayImgTrendingsDesktop(count);
}

function displayImgTrendingsDesktop(count) {
    let imgTrendigns = document.getElementsByClassName("img-gif-slider");
    if (window.matchMedia("(min-width: 600px)").matches) {
        if (count > (imgTrendigns.length - 3)) { count = 0 }
        if (count < 0) { count = (imgTrendigns.length - 3) }
        for (let i = 0; i < imgTrendigns.length; i++) {
            imgTrendigns[i].style.display = "none";
        }
        imgTrendigns[count].style.display = "block";
        count++
        imgTrendigns[count].style.display = "block";
        count++;
        imgTrendigns[count].style.display = "block";
    }
}


function plusSlides(n) {
    count += n;
    if (count > 9) {
        count = 0;
    }
    if (count < 0) {
        count = 9
    }
    displayImgTrendingsDesktop(count);
}