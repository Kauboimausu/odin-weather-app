import "./reset.css";
import "./styles.css";
import { UIHandler } from "./UIHandler";

const success = function(pos) {
    UIHandler.retrieveAndDisplay([pos.coords.latitude, pos.coords.longitude], false);
}

const failure = function() {
    UIHandler.retrieveAndDisplay("Greenwich, England");
}

window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(success, failure);
})

