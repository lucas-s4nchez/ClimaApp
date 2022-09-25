import { fetchWeatherData } from "./API.js";

const searchInput = document.querySelector(".search-input");
const form = document.getElementById("form");
const cardContent = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", async () => {
  // const fetchedWeather = await fetchWeatherData();
  // console.log(fetchedWeather);
});
const searchWeather = async (e) => {
  e.preventDefault();
  let search = searchInput.value.trim();
  if (search === "") {
    Swal.fire({
      title: "Error!",
      text: "Por favor ingrese una ciudad",
      icon: "error",
      confirmButtonText: "OK",
      heightAuto: false,
    });
    return;
  }
  const fetchedCity = await fetchWeatherData(search);
  // valido que el elemento no sea undefined
  if (!fetchedCity.id) {
    form.reset();
    Swal.fire({
      title: "Error!",
      text: "La ciudad ingresada no existe",
      icon: "error",
      confirmButtonText: "OK",
      heightAuto: false,
    });
    return;
  }
  renderCity(fetchedCity);
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + search + "')";
};

const renderCity = (city) => {
  cardContent.innerHTML = `
        <div class="card-clima animate">
          <div class="clima-info">
            <h3 class="info-title">${city.name}, ${city.sys.country}</h3>
            <div class="info-description">
              <p class="info-subtitle">${city.weather[0].description}</p>
              <div class="info-img">
                <img src="http://openweathermap.org/img/wn/${
                  city.weather[0].icon
                }@2x.png" alt="" />
              </div>
            </div>
            <div class="info-temp">
              <span class="temp">${Math.round(city.main.temp)} ° C</span>
              <span class="st">${Math.round(city.main.feels_like)}° ST</span>
            </div>
          </div>
          
          <div class="clima-temp">
            <span class="clima-max"><i class="fa-solid fa-temperature-arrow-up"></i> Max: ${Math.round(
              city.main.temp_max
            )}° C</span>
            <span class="clima-min"><i class="fa-solid fa-temperature-arrow-down"></i> Min: ${Math.round(
              city.main.temp_min
            )}° C</span>
            <span class="clima-humedad"><i class="fa-solid fa-droplet"></i>${
              city.main.humidity
            }% Humedad</span>
            <span class="clima-viento"><i class="fa-solid fa-wind"></i>${
              city.wind.speed
            } Km/h</span>
          </div>
        </div>
  `;
};

form.addEventListener("submit", searchWeather);
