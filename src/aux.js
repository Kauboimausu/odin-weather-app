
const convertToCelsius = function(fahrenheit) {
    fahrenheit -= 32;
    fahrenheit = fahrenheit / 1.8;
    return (Math.round(fahrenheit * 10) / 10);
}

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

export { convertToCelsius, getTimeInMeridiemFormat};