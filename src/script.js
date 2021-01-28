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

//Get HOUR
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

h2.innerHTML = `On this <br> ${day}, ${month} ${date} of ${year}, <br> we declared at ${hour}:${minutes} <br> in the city of`;

//Weather functions
function showWeather(response) {
  let conditionElement = document.querySelector("#condition");
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let feelslikeElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  conditionElement.innerHTML = response.data.weather[0].main;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = response.data.main.humidity;
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = `2fb16a57cb4b18c7686f92b2ebb6446f`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
  }

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", submitCity);

search("Antananarivo");
