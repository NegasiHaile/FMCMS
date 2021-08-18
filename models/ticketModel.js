const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const ticketModel = new mongoose.Schema(
  {
    businessId: {
      type: ObjectID,
      required: true,
    },
    machineId: {
      type: ObjectID,
      required: true,
    },
    problemType: {
      type: String,
    },
    ticketType: {
      type: String, // values:- Annual, Incident
    },
    ticketStatus: {
      type: String, // values:- New, closed
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tickets", ticketModel);
