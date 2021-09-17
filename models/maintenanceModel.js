const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const maintenanceModel = new mongoose.Schema(
  {
    salesID: {
      type: ObjectID,
      required: true,
    },
    businessId: {
      type: ObjectID,
      required: true,
    },
    machineID: {
      type: ObjectID,
      required: true,
    },
    branchID: {
      type: ObjectID,
      required: true,
    },
    catagory: {
      type: String, // annual/incident
    },
    type: {
      type: String, // osite/onfron/inside
    },
    clientReportedIssue: {
      type: String,
    },
    technicianReportedIssue: {
      type: String,
    },
    maintainedBy: {
      type: String,
    },
    maintenanceDate: {
      type: Date,
    },
    nextMaintenanceDate: {
      type: Date,
    },
    maintenanceStatus: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Maintenances", maintenanceModel);
