const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const salesSchema = new mongoose.Schema(
  {
    machineId: {
      type: ObjectID,
      required: true,
    },
    businessId: {
      type: ObjectID,
      required: true,
    },
    branchId: {
      type: ObjectID,
      required: true,
    },
    status: {
      type: String, //Value:-  new, unapproved , instore/rejected, fiscallizing, controlling, delivering, completed
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sales", salesSchema);
