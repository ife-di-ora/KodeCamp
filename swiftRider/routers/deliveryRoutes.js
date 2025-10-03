const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createNewReq,
  viewReq,
  acceptReq,
} = require("../controllers/deliveryController");

const router = express.Router();

router.use(verifyToken);
router.post("/newrequest", createNewReq);
router.get("/request/:requestId", viewReq);
router.patch("/request/:requestId", acceptReq);

module.exports = router;
