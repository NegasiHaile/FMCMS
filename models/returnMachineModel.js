const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const returnMachineSchema = new mongoose.Schema(
  {
    salesId: {
      type: ObjectID,
      required: true,
    },
    returnReason: {
      type: String,
      required: true,
    },
    acceptanceFile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", //Values:- Pending, Accepted
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReturnMachines", returnMachineSchema);
