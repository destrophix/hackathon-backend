const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  address: {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  doctors: [
    {
      doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
