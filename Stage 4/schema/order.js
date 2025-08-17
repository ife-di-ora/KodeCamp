const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    ordersList: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalCost: {
          type: Number,
          required: true,
        },
        shippingStatus: {
          type: String,
          enum: {
            values: ["pending", "shipped", "delivered"],
            message: `{VALUE} is not supported`,
          },
          default: "pending",
          required: true,
        },
      },
    ],
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["pending", "shipped", "delivered"],
        message: `{VALUE} is not supported`,
      },
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
