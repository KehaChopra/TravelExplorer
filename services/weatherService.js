import axios from "axios";

export async function getWeatherData(cityName) {
    console.log("Using key:", process.env.WEATHER_API_KEY);
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: cityName,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    }
  );

  const data = response.data;

  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
  };
}