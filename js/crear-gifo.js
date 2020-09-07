//Deshabilitar link crear GIFO
let linkCrear = document.getElementById("crear_gifo");

linkCrear.classList.add("disabled-crear")
linkCrear.href = "#";

//Comienzo script para el uso de la camara

let buttonIni = document.getElementById("camera-iniciar");
let buttonRec = document.getElementById("camera-grabar");
let buttonEnd = document.getElementById("camera-finalizar");
let buttonUp = document.getElementById("gif-upload");
let createGifoContainer = document.getElementsByClassName("create-gifo-container");
let video = document.getElementById("video_gif");
let pasos = document.getElementsByClassName("button-number");
let stream, recorder;
let form = new FormData();
let apiKey = "Jfllnbj2B6JMigULbuJvipUj8bsKh4l4";
let mensajesCrearGifo = document.getElementsByClassName("text-gifo-container");
let timer = document.getElementById("timer");
let comienzo;
let repeatGif = document.getElementById("repeatGif");
let loadOverlay = document.getElementsByClassName("load-overlay");
let checkUploadOverlay = document.getElementsByClassName("checkload-overlay");
let cinta1 = document.getElementById("cinta-animada1");
let cinta2 = document.getElementById("cinta-animada2");
let luzCamara = document.getElementById("luz-animada");
let listadoMisGifos;

async function activateCamera() {
    debugger;
    mensajesCrearGifo[0].classList.remove("active");
    mensajesCrearGifo[1].classList.add("active");
    cinta1.classList.add("cinta-animada1");
    cinta2.classList.add("cinta-animada2");
    luzCamara.classList.add("luz-animada");
    buttonIni.style.display = "none";
    buttonRec.style.display = "block";
    pasos[0].classList.add("button-act");
    createGifoContainer[0].classList.add("no-visible");
    let constraints = { audio: false, video: { height: 320, width: 480 } };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function (stream) {
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            video.srcObject = stream;
            video.play();
        })
}

buttonIni.addEventListener("click", activateCamera);
buttonRec.addEventListener("click", recGif);
buttonEnd.addEventListener("click", stopRec);
buttonUp.addEventListener("click", uploadGif);
repeatGif.addEventListener("click", repetirCaptura);

async function recGif() {
    debugger;
    timer.style.display = "none";
    pasos[0].classList.remove("button-act");
    pasos[1].classList.add("button-act");
    timer.style.display = "block";
    buttonRec.style.display = "none";
    buttonEnd.style.display = "block";
    recorder.startRecording();
    console.log("Record Ini");
    comienzo = new Date().getTime();
    (function looper() {
        timer.innerText = calculoDuraciónTiempo((new Date().getTime() - comienzo) / 1000);
        setTimeout(looper, 1000);
    })();
}

async function stopRec() {
    debugger;
    video.pause();
    buttonEnd.style.display = "none";
    pasos[1].classList.remove("button-act");
    pasos[2].classList.add("button-act");
    cinta1.classList.remove("cinta-animada1");
    cinta2.classList.remove("cinta-animada2");
    luzCamara.classList.remove("luz-animada");
    timer.style.display = "none";
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        //invokeSaveAsDialog(blob);
        form.append('file', blob, "miGIFO.gif");
        form.append('api_key', apiKey);
    });
    console.log(form.get('file'));

    repeatGif.style.display = "block";
    buttonUp.style.display = "block";
}

async function uploadGif() {
    debugger;
    buttonUp.style.display = "none";
    repeatGif.style.display = "none";
    loadOverlay[0].style.display = "flex";
    fetch(`https://upload.giphy.com/v1/gifs`, {
        method: "POST",
        body: form
    })
        .then(data => {
            return data.json();
        })
        .then(obj => {
            loadOverlay[0].style.display = "none";
            checkUploadOverlay[0].style.display = "flex";
            let misGifosTexto = localStorage.getItem("misGIFOS");
            if (misGifosTexto == null || misGifosTexto == "[]") {
                listadoMisGifos = [];
            } else {
                listadoMisGifos = JSON.parse(misGifosTexto);
            }
            listadoMisGifos.push(obj.data.id);
            misGifosTexto = JSON.stringify(listadoMisGifos);
            localStorage.setItem("misGIFOS", misGifosTexto);
            console.log(localStorage.getItem("misGIFOS"));
        })
        .catch(err => console.log(err));
}

function calculoDuraciónTiempo(seg) {
    let horas = Math.floor(seg / 3600);
    let minutos = Math.floor((seg - (horas * 3600)) / 60);
    let segundos = Math.floor(seg - (horas * 3600) - (minutos * 60));
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    return horas + ":" + minutos + ":" + segundos;
}

function repetirCaptura() {
    form.delete('file');
    buttonUp.style.display = "none";
    repeatGif.style.display = "none";
    pasos[2].classList.remove("button-act");
    cinta1.classList.add("cinta-animada1");
    cinta2.classList.add("cinta-animada2");
    luzCamara.classList.add("luz-animada");
    recGif();
    video.play();
}