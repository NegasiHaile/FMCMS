const mongoose = require("mongoose");

const ObjectID = mongoose.Schema.Types.ObjectID;

const clientBusinessSchema = new mongoose.Schema(
  {
    // business detail
    ownerID: {
      type: ObjectID,
      required: true,
    },
    TIN: {
      type: String,
      unique: true,
      required: true,
    },
    VAT: {
      type: String,
      // unique: true,
      required: true,
    },
    tradeName: {
      type: String,
      unique: true,
      required: true,
    },
    companyName: {
      type: String,
    },
    TL_Image: {
      type: String,
      required: true,
    },
    // Address
    city: {
      type: String,
    },
    subCity: {
      type: String,
    },
    kebele: {
      type: String,
    },
    woreda: {
      type: String,
    },
    buildingName: {
      type: String,
    },
    officeNumber: {
      type: String,
    },
    // Contacts
    telephone: {
      type: String,
    },
    email: {
      type: String,
    },
    fax: {
      type: String,
    },
    // under which branch is this request
    branch: {
      type: ObjectID,
      require: true,
    },
    // Machine assignment
    machine: {
      type: String,
      default: "unassigned", // values:- 1: requested or unssigned, 2: Assigned, 3: returning, 3: returned
    },
    // Technician assignment
    sw_Tech: {
      type: String, // values:- unassigned / sw-technician id
      default: "",
    },
    hw_Tech: {
      type: String, // values:- unassigned / hw-technician id
      default: "",
    },
    credentials: {
      type: String, // values:- 1: Pending, 2: Accepted or Rejected,
      // default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("clientBusinesses", clientBusinessSchema);
