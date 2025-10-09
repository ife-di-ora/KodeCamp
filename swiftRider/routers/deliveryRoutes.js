const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createNewReq,
  viewReq,
  viewAllReq,
  acceptReq,
} = require("../controllers/deliveryController");

const router = express.Router();

router.use(verifyToken);
router.post("/newrequest", createNewReq);
router.get("/request/:requestId", viewReq);
router.get("/request", viewAllReq);
router.patch("/request/:requestId", acceptReq);

module.exports = router;
