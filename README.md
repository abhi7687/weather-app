# 🚀 Smart Weather App

> 🌍 Real-time weather application with auto-location detection, dynamic video backgrounds, and interactive forecasts.

---

## 🌐 Live Demo

👉 https://weather-app-kohl-seven-95.vercel.app/

---

## ✨ Features

* 🌍 Auto Location Detection (Geolocation API)
* 🔍 Search Weather by City
* 🎥 Dynamic Video Backgrounds based on weather
* 📊 7-Day Forecast Overview
* ⚡ Real-time Weather Data (OpenWeather API)
* 📱 Responsive UI Design
* 🚀 Deployed on Vercel & Render

---

## 🧠 Tech Stack

### Frontend

* React
* CSS (Custom Styling)
* Axios

### Backend

* Node.js
* Express.js
* OpenWeather API

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📁 Project Structure

weather-app/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── server.js
│
├── weather-frontend/
│   ├── public/
│   ├── src/
│   └── App.js

---

## ⚙️ Installation & Setup

### Clone Repository

git clone https://github.com/abhi7687/weather-app.git
cd weather-app

---

## Backend Setup

cd backend
npm install

Create `.env` file:

API_KEY=your_openweather_api_key

Run backend:

npm start

Backend runs on:
http://localhost:5000

---

## Frontend Setup

cd weather-frontend
npm install

Create `.env` file:

REACT_APP_API_URL=http://localhost:5000

Run frontend:

npm start

Frontend runs on:
http://localhost:3000

---

## 🔌 API Endpoints

Get weather by city:

GET /weather?city=Hyderabad

Get weather by coordinates:

GET /weather?lat=17.3850&lon=78.4867

---

## 🧠 Key Highlights

* Optimized UX with loading states
* Dynamic UI using weather-based videos
* Auto-location with fallback handling
* Clean architecture (Route → Controller → Service)
* Fully deployed full-stack app

---

## 🚀 Future Improvements

* Hourly forecast charts
* Dark mode
* Saved locations
* API caching
* PWA support

---

## 🤝 Contributing

Fork → Clone → Create branch → Commit → PR

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Abhiram Vaitla

GitHub: https://github.com/abhi7687
Portfolio: https://my-portfolio-two-livid-72.vercel.app/

---

## ⭐ Support

If you like this project:

Star the repo ⭐
Share it 🚀

---

# 🔥 Final Note

This project demonstrates:

* Full-stack development
* API integration
* Deployment workflows
* Real-world UX thinking
