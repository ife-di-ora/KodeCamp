const express = require("express");
const { registerUser, userLogin } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);

module.exports = router;
