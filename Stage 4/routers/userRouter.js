const express = require("express");
const verifyToken = require("../middleware/checkAuth");
const {
  registerUser,
  userLogin,
  getAllUsers,
  viewProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/allUsers", getAllUsers);
router.get("/profile", verifyToken, viewProfile);

module.exports = router;
