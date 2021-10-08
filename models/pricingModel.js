const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    pricingName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pricings", pricingSchema);
