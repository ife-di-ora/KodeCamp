const { string } = require("joi");
const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    pickup: {
      type: String,
      required: true,
    },
    dropOff: {
      type: String,
      required: true,
    },
    packageDetails: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "inprogress", "completed"],
        message: `{VALUE} not valid`,
      },
      default: "pending",
      required: true,
    },
    riderId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },

  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("deliveries", deliverySchema);

module.exports = Delivery;
