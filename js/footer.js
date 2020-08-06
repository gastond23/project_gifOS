let iconFacebook = document.getElementById("icon_fb");
let iconTwitter = document.getElementById("icon_tw");
let iconInstagram = document.getElementById("icon_in");

iconFacebook.addEventListener("mouseover", cambioFill);
iconTwitter.addEventListener("mouseover", cambioFill);
iconInstagram.addEventListener("mouseover", cambioFill);

iconFacebook.addEventListener("mouseout", defaultFill);
iconTwitter.addEventListener("mouseout", defaultFill);
iconInstagram.addEventListener("mouseout", defaultFill);


function cambioFill() {
    if (iconTwitter == event.target) {
        iconTwitter.src = "assets/icon-twitter_hover.svg";
    }
    if (iconFacebook == event.target) {
        iconFacebook.src = "assets/icon_facebook_hover.svg";
    }
    if (iconInstagram == event.target) {
        iconInstagram.src = "assets/icon_instagram_hover.svg";
    }
}

function defaultFill() {
    if (iconTwitter == event.target) {
        iconTwitter.src = "assets/icon-twitter.svg";
    } if (iconFacebook == event.target) {
        iconFacebook.src = "assets/icon_facebook.svg";
    } if (iconInstagram == event.target) {
        iconInstagram.src = "assets/icon_instagram.svg";
    }
}