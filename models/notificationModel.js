const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const notificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: ObjectID,
      required: true,
    },
    receiverId: {
      type: ObjectID,
      required: true,
    },
    subject: {
      type: String,
    },
    theMessage: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", notificationSchema);
