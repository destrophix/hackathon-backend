const express = require("express");
const router = express.Router();

const { home, homeDummy, test } = require("../controllers/homeController");

router.route("/").get(home);
router.route("/dummy").get(homeDummy);
router.route("/test").get(test);

module.exports = router;
