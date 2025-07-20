const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkAuth");
const {
  getAllProducts,
  addNewProduct,
  deleteProduct,
} = require("../controllers/productsController");

router.get("/", getAllProducts);
router.post("/", verifyToken, addNewProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
