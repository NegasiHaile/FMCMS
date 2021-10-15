const mongoose = require("mongoose");

const mrcSchema = new mongoose.Schema(
  {
    MRC: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      default: "none",
    },
    status: {
      type: String, //Value:-  free, taken
      default: "free",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MRCs", mrcSchema);
