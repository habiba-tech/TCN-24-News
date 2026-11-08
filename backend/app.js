const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to The Current News API");
});

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({
      success: false,
      message: "Database connection unavailable",
    });
  }
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/youtube", require("./routes/youtubeRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

module.exports = app;
