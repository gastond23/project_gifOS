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