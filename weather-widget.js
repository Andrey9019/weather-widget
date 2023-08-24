"use strict";

const weatherBlock = document.querySelector(`#weather`);

async function loadWeather(e) {
  const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=47.90966&lon=33.38044&appid&appid=57cd6ef2e423d3efa870fec21b0386e6&lang=ru`;

  const response = await fetch(server, {
    method: `GET`,
  });
  const responseResult = await response.json();

  if (!response.ok) {
    weatherBlock.innerHTML = responseResult.message;
  } else {
    getWeather(responseResult);
  }
  function getWeather(data) {
    console.log(data);
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    const template = `<div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${location}</div>
                <div class="weather__starus">${weatherStatus}</div>
            </div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        </div>
        <div class="weather__temp">${temp}°</div>
        <div class="weather__feel-like">Ощущается как: ${feelLike}°</div>`;

    weatherBlock.innerHTML = template;
  }
}
if (weatherBlock) {
  loadWeather();
}
