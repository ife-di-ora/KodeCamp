const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkAuth");
const {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  getBrandProducts,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:brand/:page/:limit", getBrandProducts);
router.post("/", verifyToken, addNewProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
