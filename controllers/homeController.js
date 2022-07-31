const fetch = require("node-fetch");
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.home = (req, res) => {
  res.send("hi");
};

exports.homeDummy = (req, res) => {
  res.send("This is another dummy route");
};

exports.test = exports.getAllPatient = BigPromise(async (req, res, next) => {
  const patients = await Patient.find();
  if (!patients) {
    return next(new CustomError("patient id is invalid", 400));
  }
  fetch("https://graph.facebook.com/v13.0/107098802098161/messages", {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "918850639635",
      type: "text",
      text: {
        preview_url: false,
        body: "welcome",
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer EAALoStUKhxUBAAtAOZAva6AICwKrglZBkC1imTQ2vAH9KOy7sBoJZBsHCIOJ3IYCwo5uJmvxqvfpmWe2nvqg8ZBP0HCUageEMBPuRvO20m7EqmNsrVVBf38TZAQNOy3IibPbcqxlN8IOZCMjlBtN1lcJKiUKWh5AUwgseH3we7a3U2hD43ZA7ZBUkonXjbmGdTrjPJ5hJ1cpYAZDZD",
    },
  })
    .then((res) => res.json())
    .then((json) => res.send(json));
});
