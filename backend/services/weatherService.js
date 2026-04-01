const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const fetchWeather = async (city) => {
    // Current weather
    const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // Forecast data
    const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const current = currentRes.data;
    const forecast = forecastRes.data;

    // Extract 1 data per day (every 8th item ~ 24hrs)
    const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0);

    return {
        city: current.name,
        temperature: current.main.temp,
        description: current.weather[0].description,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,

        forecast: dailyForecast.slice(0, 7).map(item => ({
            date: item.dt_txt,
            temp: item.main.temp,
            desc: item.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
        }))
    };
};

module.exports = { fetchWeather };