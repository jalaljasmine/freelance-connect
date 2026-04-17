// ============================================
// server.js — SkillLink Backend Server
// ============================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env file");
}


const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- ROUTES ---
app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/gigs",     require("./routes/gigRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/tutors",   require("./routes/tutorRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// --- HOME ROUTE ---
app.get("/", (req, res) => {
  res.json({ message: "✅ SkillLink Backend is running!" });
});

// --- CONNECT TO MONGODB, THEN START SERVER ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`✅ SkillLink server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
