let apiKey = 'Jfllnbj2B6JMigULbuJvipUj8bsKh4l4'
var xhr = $.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=5&rating=g`);
xhr.done(function (data) { carrouselGif(data); });

let carrouselContenedor = document.getElementById("container_gif");

function carrouselGif(data) {
    let arrayGif = data.data;
    let gifSlider = "";
    for (let i = 0; i < arrayGif.length; i++) {
        let gifTrendings = arrayGif[i];
        console.log(gifTrendings);
        gifSlider += `<img src="${gifTrendings.images.fixed_height.url}" alt="${gifTrendings.title}">`;
    }
    carrouselContenedor.innerHTML = gifSlider;
}
