import clearDayImage from "./img/clear-day.png";
import clearNightImage from "./img/clear-night.png";
import cloudyDayImage from "./img/cloudy-day.png";
import cloudyNightImage from "./img/cloudy-night.png";
import rainyDayImage from "./img/rainy-day.png";
import rainyNightImage from "./img/rainy-night.png";
import stormImage from "./img/storm.png";

// converts a given temperature from fahrenheit to celsius
const convertToCelsius = function(fahrenheit) {
    fahrenheit -= 32;
    fahrenheit = fahrenheit / 1.8;
    return (Math.round(fahrenheit * 10) / 10);
}

const convertToFahrenheit = function(celsius) {
    celsius = celsius * 1.8;
    celsius += 32;
    return (Math.round(celsius * 10) / 10);
}

// Tells whether a given time is A.M. or P.M.
const getTimeInMeridiemFormat = function(timeString) {
    let hours, minutes, meridiem;
    [hours, minutes] = timeString.split(":");
    if(hours >= 12) {
        meridiem = "P.M";
    } else {
        meridiem = "A.M";
    }
    hours = hours % 12;
    if(hours === 0) {
        hours += 12;
    }
    return `${hours}:${minutes} ${meridiem}`;
}

// Function that tells whether a given time is daytime or not
const timeIsDayTime = function(time) {
    const hour = time.split(":")[0];
    return (hour >= 6 && hour < 8) ? true : false;
}

// Given a description and a time returns the appropriate icon image source
const getAppropriateImageSrc = function(description, time) {
    const dayTime = timeIsDayTime(time);
    if(description.includes("clear") || description.includes("Clear")){
        if(dayTime) {
            return clearDayImage;
        } else {
            return clearNightImage;
        }
    } else if(description.includes("cloudy") || description.includes("Cloudy")) {
        if(dayTime) {
            return cloudyDayImage;
        } else {
            return cloudyNightImage;
        }
    } else if(description.includes("rain") || description.includes("Rain")) {
        if(dayTime) {
            return rainyDayImage;
        } else {
            return rainyNightImage;
        }
    } else if(description.includes("storm") || description.includes("Storm")) {
        return stormImage;
    }
}

export { convertToCelsius, convertToFahrenheit, getTimeInMeridiemFormat, getAppropriateImageSrc};