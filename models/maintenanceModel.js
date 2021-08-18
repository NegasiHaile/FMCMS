const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const maintenanceModel = new mongoose.Schema(
  {
    ticketId: {
      type: ObjectID,
      required: true,
    },
    problemDescription: {
      type: String,
    },
    swStatus: {
      type: String,
    },
    HwStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Maintenances", maintenanceModel);
