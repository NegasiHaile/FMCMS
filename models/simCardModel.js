const mongoose = require("mongoose");

const simCardsSchema = new mongoose.Schema(
  {
    ccid: {
      type: String,
      require: true,
      unique: true,
    },
    number: {
      type: String,
      unique: true,
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

module.export = mongoose.model("SimCards", simCardsSchema);
