const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { sendRequest, getBuyerRequests, getSellerRequests, updateStatus } = require("../controllers/requestController");

router.post("/",           protect, sendRequest);
router.get("/buyer",       protect, getBuyerRequests);
router.get("/seller",      protect, getSellerRequests);
router.put("/:id/status",  protect, updateStatus);

module.exports = router;
