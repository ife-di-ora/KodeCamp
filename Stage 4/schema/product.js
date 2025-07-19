const mongoose = require("mongoose");

productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    productImages: {
      type: Array,
    },
    description: {
      type: String,
    },
    stockStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
