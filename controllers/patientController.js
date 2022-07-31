const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createPatient = BigPromise(async (req, res, next) => {
  const { name, age, address, doctors } = req.body;

  const patient = await Patient.create({
    name,
    age,
    address,
    doctors,
  });
  res.status(200).json({
    success: true,
    patient,
  });
});

exports.getPatient = BigPromise(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  let doctorInfo = await Promise.all(
    patient.doctors.map(async (ele) => {
      return await Doctor.findById(ele.doctor);
    })
  );

  if (!patient) {
    return next(new CustomError("patient id is invalid", 400));
  }

  res.status(200).json({
    success: true,
    patient,
    doctorInfo,
  });
});

exports.getAllPatient = BigPromise(async (req, res, next) => {
  const patients = await Patient.find();
  // let doctorInfo = await Promise.all(
  //   patient.doctors.map(async (ele) => {
  //     return await Doctor.findById(ele.doctor);
  //   })
  // );

  if (!patients) {
    return next(new CustomError("patient id is invalid", 400));
  }

  res.status(200).json({
    success: true,
    patients,
    // doctorInfo,
  });
});

exports.updatePatient = BigPromise(async (req, res, next) => {
  const { id, doctor } = req.body;
  const patient = await Patient.findById(req.body.id);

  if (!patient) {
    return next(new CustomError("patient id is invalid", 400));
  }

  patient.doctors.push({ doctor });
  await patient.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    patient,
  });
});

exports.deletePatient = BigPromise(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(new CustomError("patient id is invalid", 400));
  }

  await patient.remove();

  res.status(200).json({
    success: true,
  });
});
