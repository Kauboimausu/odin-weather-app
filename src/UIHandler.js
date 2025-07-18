import { lookUpCity } from "./weatherAPI";
import { convertToCelsius, convertToFahrenheit, getAppropriateImageSrc, getTimeInMeridiemFormat } from "./aux";

const UIHandler = (function () {

    let displayFahrenheit = true;

    const displayMainCard = function(currentConditions, localAdress) {
        const currentIcon = document.querySelector(".current-weather-icon");
        const currentTemperature = document.querySelector(".current-temperature");
        const currentTime = document.querySelector(".current-time");
        const currentLocation = document.querySelector(".current-location");

        currentIcon.alt = currentConditions.conditions;
        currentIcon.src = getAppropriateImageSrc(currentConditions.icon, currentConditions.datetime);
        // We convert the temperature depending on whether celsius is turned on or not 
        if(!displayFahrenheit) {
            currentTemperature.textContent = `${convertToCelsius(currentConditions.temp)}º C`;
        } else {
            currentTemperature.textContent = `${currentConditions.temp}º F`;
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
            cardFields[0].src = getAppropriateImageSrc(hourData.icon, hourData.datetime);
            cardFields[1].textContent = getTimeInMeridiemFormat(hourData.datetime);
            if(!displayFahrenheit) {
                cardFields[2].textContent = `${convertToCelsius(hourData.temp)}º C`;
            } else {
                cardFields[2].textContent = `${hourData.temp}º F`;
            }
            const precipitationInfo = cardFields[3].children;
            precipitationInfo[1].textContent = `${hourData.precipprob}%`;
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

    const changeTemperatureDisplays = function(changeTo) {
        const currentTemperature = document.querySelector(".current-temperature");
        const cardTemperatures = document.querySelectorAll(".card-temperature");
        let currentTemperatureValue = currentTemperature.textContent;
        currentTemperatureValue = currentTemperatureValue.split("º")[0];
        if(changeTo === "C") {
            currentTemperature.textContent = `${convertToCelsius(currentTemperatureValue)}º C`;
        } else {
            currentTemperature.textContent = `${convertToFahrenheit(currentTemperatureValue)}º F`;
        }
        for(let index = 0; index < cardTemperatures.length; index++) {
            let cardTemperatureValue = cardTemperatures[index].textContent;
            cardTemperatureValue = cardTemperatureValue.split("º")[0];
            if(changeTo === "C") {
                cardTemperatures[index].textContent = `${convertToCelsius(cardTemperatureValue)}º C`;
            } else {
                cardTemperatures[index].textContent = `${convertToFahrenheit(cardTemperatureValue)}º F`;
            }
        }
    }


    // Functionality to change in which system temperature is displayed
    const temperatureSlider = document.getElementById("temperature-slider");
    temperatureSlider.addEventListener("click", () => {
        displayFahrenheit = !displayFahrenheit;
        if(displayFahrenheit) {
            changeTemperatureDisplays("F");
        } else {
            changeTemperatureDisplays("C");
        }
    });

})();

export { UIHandler };
