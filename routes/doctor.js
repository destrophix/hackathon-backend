const express = require("express");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

const {
  createDoctor,
  getDoctor,
  getAllDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

router.route("/doctor/create").post(isLoggedIn, createDoctor);
router
  .route("/doctor/:id")
  .get(isLoggedIn, getDoctor)
  .delete(isLoggedIn, deleteDoctor);

router.route("/doctor").get(isLoggedIn, customRole("admin"), getAllDoctor);

module.exports = router;
