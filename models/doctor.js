const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  specialization: {
    type: String,
  },
  medicine: {
    recommended: {
      type: String,
    },
    alternative: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
