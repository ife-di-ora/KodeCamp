const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
      enum: {
        values: ["rider", "customer", "admin"],
        message: `{VALUE} not supported`,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
