require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware CORS
app.use(cors());

app.use(bodyParser.json());

const db = require("./utils/db"); // Menghubungkan ke database

app.use("/api/users", require("./routes/userRoutes"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});