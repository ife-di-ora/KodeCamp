const mongoose = require("mongoose");

brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const brandModel = mongoose.model("brands", brandSchema);

module.exports = brandModel;
