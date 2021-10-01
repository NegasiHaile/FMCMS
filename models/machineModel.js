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
      type: String,
      default: "0",
    },
    branch: {
      type: String,
      default: "none",
    },
    fiscalizationTimes: {
      type: Number,
      default: 0,
    },
    salesStatus: {
      type: String,
      default: "unsold", // values, New, requested, sold, returned
    },
    availableIn: {
      type: String,
      default: "main-store", // values, main-store, branch-store, technical-store, machine-controller, delivered
    },
  },
  {
    timestamps: true,
  }
);
// a machine have to be a status of sold, unsold, fine, dameged, in maintenance ...
module.exports = mongoose.model("Machines", machineSchema);
