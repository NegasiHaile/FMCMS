const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    mName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    photo: {
      type: String,
    },
    branch: {
      type: String,
      // required: true,
    },

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

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unique : true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "ON",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
