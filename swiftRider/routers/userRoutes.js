const express = require("express");
const {
  userLogin,
  getAllUsers,
  userSignUp,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/allusers", verifyToken, getAllUsers);

module.exports = router;
