const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
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

module.exports = mongoose.model("Hospital", hospitalSchema);
