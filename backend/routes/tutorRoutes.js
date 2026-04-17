// routes/tutorRoutes.js — Routes for tutor listings
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/tutors — Get all tutors
router.get("/", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" }).select("-password");
    
    // If no tutors in DB yet, return demo data
    if (tutors.length === 0) {
      return res.json([
        { _id: "1", name: "Aisha Patel", subject: "Mathematics", rating: 4.9, sessions: 120, bio: "MSc in Applied Math. Specializes in calculus and linear algebra.", avatar: "A", hourlyRate: 25 },
        { _id: "2", name: "James Wilson", subject: "Physics", rating: 4.8, sessions: 95, bio: "Physics major with a passion for making mechanics intuitive.", avatar: "J", hourlyRate: 30 },
        { _id: "3", name: "Sara Chen", subject: "Chemistry", rating: 4.7, sessions: 78, bio: "Organic chemistry expert. Lab TA for 3 years.", avatar: "S", hourlyRate: 28 },
        { _id: "4", name: "Miguel Rodriguez", subject: "Computer Science", rating: 4.9, sessions: 150, bio: "Full-stack developer. Teaches Python, Java, and web dev.", avatar: "M", hourlyRate: 35 },
        { _id: "5", name: "Emily Thompson", subject: "English", rating: 4.6, sessions: 64, bio: "Published author. Helps with essays, grammar, and creative writing.", avatar: "E", hourlyRate: 22 },
        { _id: "6", name: "David Kim", subject: "Biology", rating: 4.8, sessions: 88, bio: "Pre-med student. Strong in anatomy and molecular biology.", avatar: "D", hourlyRate: 27 },
      ]);
    }
    
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tutors", error: err.message });
  }
});

module.exports = router;
