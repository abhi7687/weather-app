const { fetchWeather } = require("../services/weatherService");

const getWeather = async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const data = await fetchWeather(city);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = { getWeather };