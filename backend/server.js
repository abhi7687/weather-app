const express = require('express');
const cors = require('cors');

require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());

app.use("/weather", weatherRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Weather API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});