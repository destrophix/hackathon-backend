const Doctor = require("../models/doctor");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createDoctor = BigPromise(async (req, res, next) => {
  const { name, specialization, medicine } = req.body;

  const doctor = await Doctor.create({
    name,
    specialization,
    medicine,
  });
  res.status(200).json({
    success: true,
    doctor,
  });
});

exports.getDoctor = BigPromise(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new CustomError("doctor id is invalid", 400));
  }

  res.status(200).json({
    success: true,
    doctor,
  });
});

exports.getAllDoctor = BigPromise(async (req, res, next) => {
  const doctors = await Doctor.find();

  if (!doctors.length) {
    return next(new CustomError("doctor id is invalid", 400));
  }

  res.status(200).json({
    success: true,
    doctors,
  });
});

exports.deleteDoctor = BigPromise(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new CustomError("doctor id is invalid", 400));
  }

  await doctor.remove();

  res.status(200).json({
    success: true,
  });
});
