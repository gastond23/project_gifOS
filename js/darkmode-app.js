let linkDarkMode = document.getElementById("modo_nocturno");
let modeStatus = localStorage.getItem("statusMode");


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
        }
        linkDarkMode.innerHTML = "Modo Claro";
        document.getElementById("body").classList.add("dark");
    } else if (modeStatus == "false") {
        if (window.matchMedia("(min-width: 650px)").matches) {
            linkDarkMode.innerHTML = "MODO NOCTURNO";
        }
        linkDarkMode.innerHTML = "Modo Nocturno";
        document.getElementById("body").classList.remove("dark");
    }
}