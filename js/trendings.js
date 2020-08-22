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
        let trendingCard = document.createElement("div");
        let trendingOverlay = document.createElement("div");
        let userTitle = document.createElement("h4");
        let gifTitle = document.createElement("h3");
        let buttonContainer = document.createElement("div");
        let titleContainer = document.createElement("div");
        trendingCard.classList.add("trending-card-slider")
        titleContainer.classList.add("container-trend-title");
        buttonContainer.classList.add("trend-btn-container");
        trendingOverlay.classList.add("trending-overlay")
        buttonContainer.innerHTML = `<button value="${gifTrendings.id}" onclick="actualizarFavoritos('${gifTrendings.id}')"><img class="botones-overlay" src="assets/icon-fav-hover.svg"></button>
        <button value="${gifTrendings.id}" onclick="downloadGif('${gifTrendings.images.original.url}')"><img class="botones-overlay" src="assets/icon-download.svg"></button>
        <button value="${gifTrendings.id}" onclick="locateGif('${gifTrendings.id}')"><img class="botones-overlay" src="assets/icon-max.svg"></button>`;
        userTitle.innerHTML = gifTrendings.username;
        gifTitle.innerHTML = gifTrendings.title;
        titleContainer.appendChild(userTitle);
        titleContainer.appendChild(gifTitle);
        trendingOverlay.appendChild(buttonContainer);
        trendingOverlay.appendChild(titleContainer);
        imgTrenfGif.src = gifTrendings.images.original.url;
        imgTrenfGif.alt = gifTrendings.id;
        imgTrenfGif.classList.add("img-gif-slider");
        trendingCard.appendChild(trendingOverlay);
        trendingCard.appendChild(imgTrenfGif);
        carrouselContenedor.appendChild(trendingCard);
    }
    console.log(carrouselContenedor);
    displayImgTrendingsDesktop(count);
}

function displayImgTrendingsDesktop(count) {
    let imgTrendigns = document.getElementsByClassName("trending-card-slider");
    if (window.matchMedia("(min-width: 600px)").matches) {
        for (let i = 0; i < imgTrendigns.length; i++) {
            imgTrendigns[i].style.display = "none";
        }
        imgTrendigns[count].style.display = "flex";
        count++
        imgTrendigns[count].style.display = "flex";
        count++;
        imgTrendigns[count].style.display = "flex";
    }
}


function plusSlides(n) {
    let imgTrendigns = document.getElementsByClassName("trending-card-slider");
    count += n;
    if (count > (imgTrendigns.length - 3)) {
        count = 0;
    }
    if (count < 0) {
        count = imgTrendigns.length - 3;
    }
    displayImgTrendingsDesktop(count);
}
if (window.matchMedia("(max-width: 500px)").matches) {
    carrouselContenedor.addEventListener("click", function (e) {
        gifId = e.target.alt;
        if (gifId != undefined) {
            popUp.classList.add("active");
            locateGif(gifId);
        }
    })
}