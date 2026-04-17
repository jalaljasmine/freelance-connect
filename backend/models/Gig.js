// models/Gig.js — Recipe for a Gig
// Real world: Like a product listing on Amazon.
// Every product has: title, description, price, photos, seller.

const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title:       { type: String, required: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true },
    images:      { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", gigSchema);
