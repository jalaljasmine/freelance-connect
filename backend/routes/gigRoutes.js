const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload  = require("../middleware/uploadMiddleware");
const { createGig, getAllGigs, getGigById, deleteGig } = require("../controllers/gigController");

router.get("/",       getAllGigs);
router.get("/:id",    getGigById);
router.post("/",      protect, upload.array("images", 5), createGig);
router.delete("/:id", protect, deleteGig);

module.exports = router;
