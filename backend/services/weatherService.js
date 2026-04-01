const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const fetchWeather = async ({ city, lat, lon }) => {
    let currentRes, forecastRes;

    if (city) {
        currentRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
    } else {
        currentRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
    }

    const current = currentRes.data;
    const forecast = forecastRes.data;

    const dailyForecast = forecast.list.filter((_, i) => i % 8 === 0);

    return {
        city: current.name,
        temperature: current.main.temp,
        description: current.weather[0].description,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}.png`,
        forecast: dailyForecast.slice(0, 7).map(item => ({
            date: item.dt_txt,
            temp: item.main.temp,
            desc: item.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
        }))
    };
};

module.exports = { fetchWeather };