const express = require("express");
const {
  addBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");
const verifyToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", verifyToken, addBrand);
router.get("/", getAllBrands);
router.delete("/:id", verifyToken, deleteBrand);
router.put("/:id", verifyToken, updateBrand);

module.exports = router;
