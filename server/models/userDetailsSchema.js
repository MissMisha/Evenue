const mongoose = require("mongoose")

const userDetailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    aCardNo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    collection: "userDetails",
  },
)

module.exports = mongoose.model("UserDetails", userDetailsSchema)
