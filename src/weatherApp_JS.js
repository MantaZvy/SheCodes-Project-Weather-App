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
//Feature 1
function formatDate(now) {
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let todaysDay = days[now.getDay()];

  return `${todaysDay} ${hour}:${minutes}`;
}

let searchingBtn = document.querySelector("#search-bar");
searchingBtn.addEventListener("submit", search);

let spanElement = document.querySelector("#dayNow");
let now = new Date();

spanElement.innerHTML = formatDate(now);
