const express = require("express");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

const {
  createPatient,
  getPatient,
  getAllPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

router.route("/patient/create").post(isLoggedIn, createPatient);
router.route("/patient/:id").get(isLoggedIn, getPatient);
router.route("/patient/update").post(isLoggedIn, updatePatient);

router.route("/patient").get(getAllPatient);

router
  .route("/patient/:id")
  .delete(isLoggedIn, customRole("admin"), deletePatient);

module.exports = router;
