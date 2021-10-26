const mongoose = require("mongoose");

const simCardsSchema = new mongoose.Schema(
  {
    simNumber: {
      type: String,
      unique: true,
      required: true,
    },
    branch: {
      type: String,
    },
    availableIn: {
      type: String,
      default: "main-store",
    },
    status: {
      type: String,
      default: "free",
    },
    problemStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("simcards", simCardsSchema);
