const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const machineSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    machineModel: {
      type: String,
    },

    brand: {
      type: String,
    },

    price: {
      type: Number,
    },
    problemStatus: {
      type: String, // fine, with problem, in maintenance
      required: true,
    },
    MRC: {
      type: String,
      default: "none",
    },
    SIM: {
      type: Number,
      default: null,
    },
    branch: {
      type: String,
      default: "none",
    },
    salesStatus: {
      type: String,
      default: "unsold", // values, New, requested, sold, returned
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Machines", machineSchema);
