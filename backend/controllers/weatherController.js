const { fetchWeather } = require("../services/weatherService");

const getWeather = async (req, res) => {
    const { city, lat, lon } = req.query;

    // ❗ Validate input
    if (!city && (!lat || !lon)) {
        return res.status(400).json({
            error: "Provide either city OR lat & lon"
        });
    }

    try {
        const data = await fetchWeather({ city, lat, lon });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = { getWeather };