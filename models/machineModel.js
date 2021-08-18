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
    branch: {
      type: ObjectID,
      required: true,
    },
    problemStatus: {
      type: String, // fine, with problem, in maintenance
      required: true,
    },
    salesStatus: {
      type: String,
      default: "unsold", // values, unsold, sold, returned
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Machines", machineSchema);
