let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'
var xhr = $.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6&rating=g`);
xhr.done(function (data) { carrouselGif(data); });

let carrouselContenedor = document.getElementById("container_gif");

function carrouselGif(data) {
    let arrayGif = data.data;
    let gifSlider = "";
    for (let i = 0; i < arrayGif.length; i++) {
        let gifTrendings = arrayGif[i];
        console.log(gifTrendings);
        gifSlider += `<li><img src="${gifTrendings.images.fixed_width.url}" alt="${gifTrendings.title}"></li>`;
    }
    carrouselContenedor.innerHTML = gifSlider;
}

let menuBurguer = document.getElementById("menu_ham");
let menuValor = true;
menuBurguer.addEventListener("click", slideMenuHaburguesa);

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