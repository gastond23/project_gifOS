//Deshabilitar link crear GIFO
let linkCrear = document.getElementById("crear_gifo");

linkCrear.classList.add("disabled-crear")
linkCrear.href = "#";

//Comienzo script para el uso de la camara
var constraints = { audio: false, video: { height: 320, width: 480 } };

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

function activateCamera() {
    debugger;
    buttonIni.style.display = "none";
    buttonRec.style.display = "block";
    pasos[0].classList.add("button-act");
    createGifoContainer[0].classList.add("no-visible");
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
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

function recGif() {
    debugger;
    pasos[0].classList.remove("button-act");
    pasos[1].classList.add("button-act");
    buttonRec.style.display = "none";
    buttonEnd.style.display = "block";
    recorder.startRecording();
    console.log("Record Ini");
}

async function stopRec() {
    buttonEnd.style.display = "none";
    buttonUp.style.display = "block";
    pasos[1].classList.remove("button-act");
    pasos[2].classList.add("button-act");

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        //invokeSaveAsDialog(blob);
        form.append('file', blob, "migGIFO.gif");
        form.append('api_key', apiKey);
    });
    console.log(form.get('file'));
}

async function uploadGif() {
    debugger;
    fetch(`https://upload.giphy.com/v1/gifs`, {
        method: "POST",
        body: form
    })
        .then(data => {
            return data.json();
        })
        .then(obj => {
            localStorage.setItem("misGIFOS", obj.data.id);
            console.log(localStorage.getItem("misGIFOS"));
        })
        .catch(err => console.log(err));
}