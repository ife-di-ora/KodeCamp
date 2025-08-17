const express = require("express");
const {
  registerUser,
  userLogin,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/allUsers", getAllUsers);

module.exports = router;
