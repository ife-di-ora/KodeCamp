const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkAuth");
const {
  createUserOrder,
  viewOrders,
  changeOrderStatus,
  viewOneOrder,
} = require("../controllers/orderController");

router.post("/", verifyToken, createUserOrder);
router.get("/", verifyToken, viewOrders);
router.get("/:orderId", verifyToken, viewOneOrder);
router.put("/:orderId", verifyToken, changeOrderStatus);

module.exports = router;
