// controllers/requestController.js — Request Logic
// Real world: Swiggy order system.
// SEND = place order | GET BUYER = order history | GET SELLER = incoming orders | UPDATE = deliver/cancel

const Request = require("../models/Request");
const Gig = require("../models/Gig");

const sendRequest = async (req, res) => {
  try {
    const { gigId, message } = req.body;
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found." });
    if (gig.userId.toString() === req.user.id) return res.status(400).json({ message: "Cannot request your own gig." });

    const request = await Request.create({ buyerId: req.user.id, sellerId: gig.userId, gigId, message: message || "" });
    res.status(201).json({ message: "Request sent!", request });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBuyerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ buyerId: req.user.id })
      .populate("gigId", "title price")
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSellerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sellerId: req.user.id })
      .populate("gigId", "title price")
      .populate("buyerId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["accepted", "rejected", "completed"].includes(status)) return res.status(400).json({ message: "Invalid status." });

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found." });
    if (request.sellerId.toString() !== req.user.id) return res.status(403).json({ message: "Only seller can update." });

    request.status = status;
    await request.save();
    res.status(200).json({ message: `Status updated to "${status}"`, request });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { sendRequest, getBuyerRequests, getSellerRequests, updateStatus };
