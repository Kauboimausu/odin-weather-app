// This is the base for all our weather queries
const apiBaseQuery = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "CD47TQH94D2V6R3AL86KGKS9C";

const lookUpCity = async function(city){
    let weatherData = await fetch(`${apiBaseQuery}${city}?key=${apiKey}`, {mode: "cors"});
    weatherData = await weatherData.json();
    return weatherData;
}

const lookByCoords = async function(lat, long) {
    let weatherData = await fetch(`${apiBaseQuery}${lat},${long}?key=${apiKey}`, {mode: "cors"})
    weatherData = await weatherData.json();
    return weatherData;
}

export { lookUpCity, lookByCoords };