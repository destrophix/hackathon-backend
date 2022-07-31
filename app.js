const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

const corsOptionsDelegate = function (req, callback) {
  let corsOptions = {
    origin: "http://localhost:3001",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  };
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const home = require("./routes/home");
const doctor = require("./routes/doctor");
const patient = require("./routes/patient");
const hospital = require("./routes/hospital");
const user = require("./routes/user");

app.use("/api/v1", home);
app.use("/api/v1", doctor);
app.use("/api/v1", patient);
app.use("/api/v1", hospital);
app.use("/api/v1", user);

module.exports = app;
