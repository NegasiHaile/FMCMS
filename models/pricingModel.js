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
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pricings", pricingSchema);
