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
        } else {
            linkDarkMode.innerHTML = "Modo Claro";
        }
        document.getElementById("body").classList.add("dark");
        document.getElementById("menu_ham").src = "assets/button-close-dark.svg";
    } else if (modeStatus == "false") {
        if (window.matchMedia("(min-width: 650px)").matches) {
            linkDarkMode.innerHTML = "MODO NOCTURNO";
        } else {
            linkDarkMode.innerHTML = "Modo Nocturno";
        }
        document.getElementById("body").classList.remove("dark");
        if (menuValor == true) {
            document.getElementById("menu_ham").src = "assets/burger.svg";
        } else {
            document.getElementById("menu_ham").src = "assets/button-close.svg";
        }
    }
}