let linkDarkMode = document.getElementById("modo_nocturno");
let modeStatus = localStorage.getItem("statusMode");
let menuValor = true;

if (modeStatus == null) {
    modeStatus = "false";
    localStorage.setItem("statusMode", modeStatus);
}

cambioModo(modeStatus);

linkDarkMode.addEventListener("click", function (e) {
    e.preventDefault();
    if (modeStatus == "true") {
        modeStatus = "false";
        localStorage.setItem("statusMode", modeStatus);
        cambioModo(modeStatus);
    } else if (modeStatus == "false") {
        modeStatus = "true";
        localStorage.setItem("statusMode", modeStatus);
        cambioModo(modeStatus);
    }
})

function cambioModo(modeStatus) {
    if (modeStatus == "true") {
        if (window.matchMedia("(min-width: 650px)").matches) {
            linkDarkMode.innerHTML = "MODO CLARO";
            document.getElementById("home_logo").src = "assets/logo-desktop-modo-noc.svg";
        } else {
            linkDarkMode.innerHTML = "Modo Claro";
            document.getElementById("home_logo").src = "assets/logo-mobile-modo-noc.svg";
        }
        document.getElementById("body").classList.add("dark");
        document.getElementById("menu_ham").src = "assets/button-close-dark.svg";
        if (window.location.pathname == "/index.html") {
            document.getElementById("lupa_input").src = "assets/icon-search-mod-noc.svg";
        }
        if (window.location.pathname == "/crear_gifo.html") {
            document.getElementById("cinta-animada1").src = "assets/element_cinta1-modo-noc.svg";
            document.getElementById("cinta-animada2").src = "assets/element_cinta2-modo-noc.svg";
            document.getElementById("camara_img").src = "assets/element-camara-dark-mode.svg";
            document.getElementById("rollo_pelicula").src = "assets/pelicula-modo-noc.svg";
        }
    } else if (modeStatus == "false") {
        if (window.matchMedia("(min-width: 650px)").matches) {
            linkDarkMode.innerHTML = "MODO NOCTURNO";
            document.getElementById("home_logo").src = "assets/logo-desktop.svg";
        } else {
            linkDarkMode.innerHTML = "Modo Nocturno";
            document.getElementById("home_logo").src = "assets/logo-mobile.svg";
        }
        document.getElementById("body").classList.remove("dark");
        if (window.location.pathname == "/index.html") {
            document.getElementById("lupa_input").src = "assets/icon-search.svg";
        }
        if (menuValor == true) {
            document.getElementById("menu_ham").src = "assets/burger.svg";
        } else {
            document.getElementById("menu_ham").src = "assets/button-close.svg";
        }
        if (window.location.pathname == "/crear_gifo.html") {
            document.getElementById("cinta-animada1").src = "assets/element_cinta1.svg";
            document.getElementById("cinta-animada2").src = "assets/element_cinta2.svg";
            document.getElementById("camara_img").src = "assets/element-camara.svg";
            document.getElementById("rollo_pelicula").src = "assets/pelicula.svg";
        }
    }
}