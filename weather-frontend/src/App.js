import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const weatherVideos = {
  "01": "/videos/clear.mp4",
  "02": "/videos/cloudy.mp4",
  "03": "/videos/cloudy.mp4",
  "04": "/videos/cloudy.mp4",
  "09": "/videos/rain.mp4",
  "10": "/videos/rain.mp4",
  "11": "/videos/storm.mp4",
  "13": "/videos/snow.mp4",
  "50": "/videos/mist.mp4",
  default: "/videos/default.mp4",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  // 🌍 AUTO LOCATION
  useEffect(() => {
    if (!navigator.geolocation) {
      getWeather("Hyderabad");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setLoading(true);
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}`
          );
          setWeather(res.data);
        } catch (err) {
          setError("Failed to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        console.log("Location permission denied");
        getWeather("Hyderabad"); // fallback
      }
    );
  }, []);

  // 🔁 HANDLE DISPLAY DATA
  const displayData =
    weather && selectedDay !== null
      ? weather.forecast[selectedDay]
      : weather;

  // 🎥 VIDEO LOGIC
  const getVideoSrc = () => {
    if (!displayData || !displayData.icon) return weatherVideos.default;

    const iconName = displayData.icon.split("/").pop();
    const code = iconName.substring(0, 2);

    return weatherVideos[code] || weatherVideos.default;
  };

  // 🔍 SEARCH WEATHER
  const getWeather = async (inputCity) => {
    const queryCity = inputCity || city;
    if (!queryCity) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setSelectedDay(null);

    try {
      console.log("API:", process.env.REACT_APP_API_URL);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather?city=${queryCity}`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        key={getVideoSrc()}
        className="bg-video"
      >
        <source src={getVideoSrc()} type="video/mp4" />
      </video>

      <div className="container">
        <h1 className="title">
          <img
            src={`${process.env.PUBLIC_URL}/icon.png`}
            alt="icon"
            className="icon"
          />
          Weather
        </h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          <button onClick={() => getWeather()}>
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* 🔄 Loading State */}
        {loading && !weather && <p className="error">Detecting your location...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="card">
            <h2 className="city">{weather.city}</h2>

            <img
              src={displayData?.icon}
              alt={displayData?.desc || displayData?.description}
              className="weather-icon"
            />

            <div className="temp">
              {selectedDay !== null
                ? displayData.temp
                : displayData.temperature}°
            </div>

            <p className="desc">
              {selectedDay !== null
                ? displayData.desc
                : displayData.description}
            </p>

            <div className="details">
              <div>
                <p className="label">Humidity</p>
                <p>{weather.humidity}%</p>
              </div>
              <div>
                <p className="label">Wind</p>
                <p>{weather.windSpeed} m/s</p>
              </div>
            </div>
          </div>
        )}

        {weather?.forecast && (
          <div className="forecast">
            {weather.forecast.map((day, index) => (
              <div
                key={index}
                className={`forecast-card ${
                  selectedDay === index ? "active" : ""
                }`}
                onClick={() => setSelectedDay(index)}
              >
                <p className="forecast-day">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <img src={day.icon} alt="icon" />

                <p className="forecast-temp">{Math.round(day.temp)}°</p>
                <p className="forecast-desc">{day.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;