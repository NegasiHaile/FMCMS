const mongoose = require("mongoose");

const jupiterBranchsSchema = new mongoose.Schema({
  branchName: {
    type: String,
    unique: true,
    default: true,
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
  // description about the
  Description: {
    type: String,
  },
});

module.exports = mongoose.model("Branchs", jupiterBranchsSchema);
