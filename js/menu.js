//Control del menu hamburghesa, declaracion de variables
let menuBurguer = document.getElementById("menu_ham");

if (modeStatus == "true") {
    menuBurguer.src = "assets/burger-dark.svg";
}
//Captación del evento click en la imagen del menu hamburguesa
menuBurguer.addEventListener("click", slideMenuHaburguesa);

//Funcion para activar y desactivar la muestra del menu hamburguesa
function slideMenuHaburguesa() {
    if (menuValor == true) {
        if (modeStatus == "true") {
            menuBurguer.src = "assets/button-close-dark.svg";
        } else {
            menuBurguer.src = "assets/close.svg";
        }
        menuValor = false;
        document.getElementById("body").classList.add("no-scroll");
        document.getElementById("menu").style.display = "flex";
    } else {
        menuValor = true;
        if (modeStatus == "true") {
            menuBurguer.src = "assets/burger-dark.svg";
        } else {
            menuBurguer.src = "assets/burger.svg";
        }
        document.getElementById("menu").style.display = "none";
        document.getElementById("body").classList.remove("no-scroll");
    }
}

//Modificacion del menu desktop se agrega link crear Gifos

let menuDesktop = document.getElementById("menu");
let homeLogo = document.getElementById("home_logo");
let nuevoLi = document.createElement("li");
let nuevoLink = document.createElement("a");


function cambioDesktop() {
    if (window.matchMedia("(min-width: 650px)").matches) {
        if (modeStatus == "true") {
            homeLogo.src = "assets/logo-desktop-modo-noc.svg";
        } else {
            homeLogo.src = "assets/logo-desktop.svg";
        }
        nuevoLink.classList.add("item-crear-gifo");
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
    } else {
        if (modeStatus == "true") {
            homeLogo.src = "assets/logo-mobile-modo-noc.svg";
        } else {
            homeLogo.src = "assets/logo-mobile.svg";
        }
        if (menuDesktop.innerHTML.length > 408) {
            nuevoLi.removeChild(nuevoLink);
            menuDesktop.removeChild(nuevoLi);
        }
    }
}

cambioDesktop();