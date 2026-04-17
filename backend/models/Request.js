// models/Request.js — Recipe for a Service Request
// Real world: Like ordering food on Swiggy.
// Order has: customer, restaurant, item, status (placed/accepted/delivered)

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    buyerId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gigId:    { type: mongoose.Schema.Types.ObjectId, ref: "Gig",  required: true },
    status:   { type: String, enum: ["pending", "accepted", "rejected", "completed"], default: "pending" },
    message:  { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
