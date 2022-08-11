///show current date & time:
let currentTime = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currentTime.getDay()];
let currentHours = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
h2.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

///show current temperature (°C/°F):
function currentTempC(event) {
  event.preventDefault();
  let cardText = document.querySelector("#current-temperature");
  cardText.innerHTML = "26°";
}
let celsius = document.querySelector("#C");
celsius.addEventListener("click", currentTempC);

function currentTempF(event) {
  event.preventDefault();
  let cardText = document.querySelector("#current-temperature");
  cardText.innerHTML = "79°";
}
let fahrenheit = document.querySelector("#F");
fahrenheit.addEventListener("click", currentTempF);


///weather details for today:
function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let curTemp = document.querySelector("#current-temperature");
  curTemp.innerHTML = Math.round(response.data.main.temp);
  let sky = document.querySelector("#sky");
  sky.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}

///search weather by city:
function search(city) {
  let apiKey = "2b5667a8237d1b01430707e2a1deb6dc";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

///show current location:

function showPosition(position) {
  let apiKey = "2b5667a8237d1b01430707e2a1deb6dc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentCity = document.querySelector("#current-location-btn");
currentCity.addEventListener("click", getCurrentPosition);

search("Kyiv");