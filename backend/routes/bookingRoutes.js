// routes/bookingRoutes.js — Routes for booking tutoring sessions
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

// POST /api/bookings — Create a new booking (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { tutorId, tutorName, subject, date, time, notes, studentName, rate } = req.body;
    const booking = await Booking.create({
      tutorId,
      tutorName,
      subject,
      date,
      time,
      notes,
      studentName: studentName || req.user?.name || "Student",
      rate: rate || 25,
      status: "upcoming",
      userId: req.user.id,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
});

// GET /api/bookings/my — Get current user's bookings (protected)
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});

module.exports = router;
