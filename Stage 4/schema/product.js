const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

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
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brands",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
