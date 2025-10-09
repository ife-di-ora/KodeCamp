const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addLocation,
  getLocation,
} = require("../controllers/locationController");
const router = express.Router();

router.use(verifyToken);
router.patch("/update/:deliveryId", addLocation);
router.get("/update/:deliveryId", getLocation);

module.exports = router;
