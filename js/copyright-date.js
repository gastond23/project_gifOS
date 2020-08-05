
//Llamado de la función Year para mostrar el año en copyright y que quede siempre actualizado
Year();

//Funcion Year para la muestra del año a traves del objeto Date y la funcion getFullYear
function Year() {
    let d = new Date();
    let n = d.getFullYear();
    document.getElementById("copyright").innerHTML = "&copy; " + n + " All Rights Reserved.";
}