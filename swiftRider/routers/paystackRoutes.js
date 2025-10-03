const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { initializePayment } = require("../controllers/paystackController");

const router = express.Router();

router.post("/initialize", verifyToken, initializePayment);

module.exports = router;
