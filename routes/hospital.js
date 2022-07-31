const express = require("express");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

const {
  createHospital,
  getHospital,
  getAllHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");

router.route("/hospital/create").post(isLoggedIn, createHospital);
router.route("/hospital/:id").get(isLoggedIn, getHospital);
router.route("/hospital/update").post(isLoggedIn, updateHospital);

router.route("/hospital").get(isLoggedIn, customRole("admin"), getAllHospital);
router
  .route("/hospital/:id")
  .get(isLoggedIn, customRole("admin"), deleteHospital);

module.exports = router;
