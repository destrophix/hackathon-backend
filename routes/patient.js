const express = require("express");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

const {
  createPatient,
  getPatient,
  getAllPatient,
  updatePatient,
} = require("../controllers/patientController");

router.route("/patient/create").post(isLoggedIn, createPatient);
router.route("/patient/:id").get(isLoggedIn, getPatient);
router.route("/patient/update").post(isLoggedIn, updatePatient);

router.route("/patient").get(isLoggedIn, customRole("admin"), getAllPatient);

module.exports = router;
