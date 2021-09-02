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
      type: ObjectID,
      default: null,
    },
    SIM: {
      type: Number,
      default: null,
    },
    branch: {
      type: ObjectID,
      default: null,
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
