// models/User.js — Recipe/shape of a User in MongoDB
// Real world: Like a government ID card format.
// Every ID has: name, DOB, ID number.
// Our User always has: name, email, password, role.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Stored as HASH, never plain text!
    role:     { type: String, enum: ["buyer", "seller", "both", "student", "tutor"], default: "student" },
  },
  { timestamps: true } // Auto adds createdAt and updatedAt
);

module.exports = mongoose.model("User", userSchema);
