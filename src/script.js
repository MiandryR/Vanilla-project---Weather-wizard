//Date & Hour
let now = new Date();
let h2 = document.querySelector("h2");

//Get DAY
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];


  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

//Get DATE
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let year = now.getFullYear();
let month = months[now.getMonth()];
let date = now.getDate();

h2.innerHTML = `On this <br> ${day}, ${month} ${date} of ${year}, <br> we declared at <br> ${hour}:${minutes} <br> in the city of`;

//Weather functions
function showWeather(response) {
  let conditionElement = document.querySelector("#condition");
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let feelslikeElement = document.querySelector("#feels-like");
  let windspeedElement = document.querySelector("#windspeed");
  let iconElement = document.querySelector("#icon");
  
  celsiusTemp = response.data.main.temp;
  celsiusFeelsLike = response.data.main.feels_like;
  celsiusMin = response.data.main.temp_min;
  celsiusMax = response.data.main.temp_max;
  kmhWindspeed = response.data.wind.speed;

  conditionElement.innerHTML = response.data.weather[0].main;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = response.data.main.humidity;
  feelslikeElement.innerHTML = Math.round(celsiusFeelsLike);
  windspeedElement.innerHTML = Math.round(kmhWindspeed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
   
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastMax = forecast.main.temp_max;
    forecastMaxConverted = forecast.main.temp_max *1.8 + 32;

    forecastElement.innerHTML += `
    <div class="col-2">
              <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong id="convertedMax">
        ${Math.round(forecastMax)}°C
        </strong>
        <span id="convertedMin">
        ${Math.round(forecastMaxConverted)}°F
        </span>
      </div>
    </div>
  `;
  }
}

function hideElement() {
  document.getElementById("sign-metric").style.visibility = "hidden";
}

function search(city) {
  let apiKey = `2fb16a57cb4b18c7686f92b2ebb6446f`;
  let unit = `metric`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);

  }

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = celsiusTemp * 1.8 + 32;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  toFahrenheit.classList.remove("active");
  let fahrenheitFeelslike = celsiusFeelsLike * 1.8 + 32;
  let feelslikeElement = document.querySelector("#feels-like");
  feelslikeElement.innerHTML = `${Math.round(fahrenheitFeelslike)}ºF`;

  let mhWindspeed = kmhWindspeed * 1.609344;
  let windspeedElement = document.querySelector("#windspeed");
  windspeedElement.innerHTML = `${Math.round(mhWindspeed)}mh`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);

  let feelslikeElement = document.querySelector("#feels-like");
  feelslikeElement.innerHTML = `${Math.round(celsiusFeelsLike)}ºC`;

  let windspeedElement = document.querySelector("#windspeed");
  windspeedElement.innerHTML = `${Math.round(kmhWindspeed)}km/h`;
}

let celsiusTemp = null;
let celsiusFeelsLike = null;
let kmhWindspeed = null;

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", submitCity);

let toFahrenheit = document.querySelector("#to-fahrenheit");
toFahrenheit.addEventListener("click", displayFahrenheitTemp);

let toCelsius = document.querySelector("#to-celsius");
toCelsius.addEventListener("click", displayCelsiusTemp);

search("Antananarivo");