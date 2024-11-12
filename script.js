const apiKey = "6129b62c7481df5695eeeeff4dfd8b05";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        document.querySelector(".error").textContent = "Please enter a city name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            document.querySelector(".error").textContent = "City not found. Please check the name.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else if (!response.ok) {
            throw new Error("Network response was not ok");
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            switch(data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        document.querySelector(".error").textContent = "Unable to fetch data. Please try again later.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error("Error fetching weather data:", error);
    }
}

// Event listeners for search actions
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
