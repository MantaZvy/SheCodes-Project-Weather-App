//Weather API
//Display temperature
function displayTemperature(response) {
  console.log(response);
  let tempElement = document.querySelector("#temp-value");
  tempElement.innerHTML = Math.round(response.data.temperature.current);

  let displayCity = document.querySelector("#displayCity");
  displayCity.innerHTML = response.data.city;

  let displayHumidity = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  displayHumidity.innerHTML = `${humidity}%`;

  let displayWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  displayWind.innerHTML = `${wind} p/h`;

  let weatherInfo = document.querySelector("#weather-description");
  let weatherDescription = response.data.condition.description;
  weatherInfo.innerHTML = `${weatherDescription}`;

  let timeElement = document.querySelector("#time");
  let timeStamp = response.data.time * 1000;
  let date = new Date(timeStamp);
  timeElement.innerHTML = formatDate(date);

  let iconApi = document.querySelector("#api-icon");
  iconApi.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon"/>`;

  getForecast(response.data.city);
}
//Feature- Live Time
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}
//API Key
//Function to handle search
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-section");
  let city = searchInput.value;
  let apiKey = "fcd20cbab033a83d4912e96fcoedf8t4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

//Get forecast data
function getForecast(city) {
  let apiKey = "fcd20cbab033a83d4912e96fcoedf8t4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Weather Forecast - JS Template
function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let htmlForecast = "";
  days.forEach(function (day) {
    htmlForecast =
      htmlForecast +
      `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌤️</div>
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-max-temperature"> 22° </span>
    <span class="weather-forecast-min-temperature"> 13° </span>
    </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = htmlForecast;
}

let searchingBtn = document.querySelector("#search-bar");
searchingBtn.addEventListener("submit", search);

search("London");
