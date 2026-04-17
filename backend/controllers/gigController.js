// controllers/gigController.js — Gig Logic
// Real world: Etsy shop manager.
// CREATE = seller lists a product | GET ALL = browse store | DELETE = remove product

const Gig = require("../models/Gig");

const createGig = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const images = req.files ? req.files.map((f) => f.path) : [];
    const gig = await Gig.create({ userId: req.user.id, title, description, price: Number(price), images });
    res.status(201).json({ message: "Gig created!", gig });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate("userId", "name email").sort({ createdAt: -1 });
    // .populate replaces userId (64abc...) with actual user name + email
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("userId", "name email");
    if (!gig) return res.status(404).json({ message: "Gig not found." });
    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found." });
    if (gig.userId.toString() !== req.user.id) return res.status(403).json({ message: "You can only delete your own gigs." });
    await gig.deleteOne();
    res.status(200).json({ message: "Gig deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createGig, getAllGigs, getGigById, deleteGig };
