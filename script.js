const apiKey = "23008f292c22ab5609c21fe9abbb56e6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return; // Exit if the response is not ok
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels-like").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".pressure").innerHTML = `Pressure: ${data.main.pressure} hPa`;
    document.querySelector(".visibility").innerHTML = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/snow.png";
    }

    // Display the weather details
    document.querySelector(".weather").style.display = "block";
}
