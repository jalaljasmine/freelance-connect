// models/Booking.js — Shape of a tutoring session booking
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    tutorId:     { type: String },
    tutorName:   { type: String, required: true },
    subject:     { type: String, required: true },
    date:        { type: String, required: true },
    time:        { type: String, required: true },
    notes:       { type: String, default: "" },
    rate:        { type: Number, default: 25 },
    status:      { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming" },
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
