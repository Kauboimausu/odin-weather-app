import { lookUpCity } from "./weatherAPI";
import { convertToCelsius, getTimeInMeridiemFormat } from "./aux";

const UIHandler = (function () {

    let displayFahrenheit = true;

    const displayMainCard = function(currentConditions, localAdress) {
        const currentIcon = document.querySelector(".current-weather-icon");
        const currentTemperature = document.querySelector(".current-temperature");
        const currentTime = document.querySelector(".current-time");
        const currentLocation = document.querySelector(".current-location");

        currentIcon.alt = currentConditions.conditions;
        // We convert the temperature depending on whether celsius is turned on or not 
        if(!displayFahrenheit) {
            currentTemperature.textContent = `${convertToCelsius(currentConditions.temp)}ºC`;
        } else {
            currentTemperature.textContent = `${currentConditions.temp}ºF`;
        }
        currentTime.textContent = getTimeInMeridiemFormat(currentConditions.datetime);
        currentLocation.textContent = localAdress;
    }

    const displayHourCards = function(hourlyData) {
        const hourCards = document.querySelectorAll(".hourly-card");
        for(let index = 0; index < hourCards.length; index++) {
            const hourData = hourlyData[index];
            const hourCard = hourCards[index];
            const cardFields = hourCard.children;
            cardFields[0].alt = hourData.icon;
            cardFields[1].textContent = getTimeInMeridiemFormat(hourData.datetime);
            if(!displayFahrenheit) {
                cardFields[2].textContent = `${convertToCelsius(hourData.temp)}ºC`;
            } else {
                cardFields[2].textContent = `${hourData.temp}ºF`;
            }
            cardFields[3].textContent = `Precipitation Probability: ${hourData.precipprob}`;
        }
    }

    const retrieveAndDisplay = function(location) {
        lookUpCity(location).then(
                function (weatherData) {
                    console.log(weatherData);
                    displayMainCard(weatherData.currentConditions, weatherData.resolvedAddress);
                    displayHourCards(weatherData.days[0].hours);
                },
            );
    }

    const addSearchBarListener = function () {
        const locationForm = document.getElementById("location-form");
        locationForm.addEventListener("submit", (e) => {
            // We stop the page from reloading
            e.preventDefault();
            const locationData = new FormData(locationForm);
            retrieveAndDisplay(locationData.get("location"));
        });
    };

    addSearchBarListener();
})();

export { UIHandler };
