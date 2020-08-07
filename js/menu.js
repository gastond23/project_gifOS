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

//Modificacion del menu desktop se agrega link crear Gifos

let menuDesktop = document.getElementById("menu");
let homeLogo = document.getElementById("home_logo");

var x = window.matchMedia("(min-width: 600px)");

function desktopNavBar(x) {
    if (x.matches) {
        homeLogo.src = "assets/logo-desktop.svg";
        let nuevoLi = document.createElement("li");
        let nuevoLink = document.createElement("a");
        nuevoLink.classList.add("item-menu");
        nuevoLink.href = "crear_gifo.html";
        nuevoLink.id = "crear_gifo";
        nuevoLink.innerText = "+"
        nuevoLi.appendChild(nuevoLink);
        menuDesktop.appendChild(nuevoLi);
        let linksMenu = document.getElementsByClassName("item-menu");
        for (let i = 0; i < linksMenu.length; i++) {
            let textMayus = linksMenu[i].innerText;
            textMayus = textMayus.toUpperCase();
            linksMenu[i].innerText = textMayus;
        }
    }
}
desktopNavBar(x);

