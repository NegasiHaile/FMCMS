const mongoose = require("mongoose");

const senderEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: undefined,
    },
    expireToken: {
      type: Date,
      default: undefined,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SenderEmails", senderEmailSchema);
