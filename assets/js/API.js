export const fetchWeatherData = async (city) => {
  const apiKey = "b7fdbffa78fde7e422e1bada8b1cb34a";
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const queryParams = `?q=${city}&lang=es&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(`${urlBase}${queryParams}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
