const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createHospital = BigPromise(async (req, res, next) => {
  const { name, address, doctors } = req.body;

  const hospital = await Hospital.create({
    name,
    address,
    doctors,
  });
  res.status(200).json({
    success: true,
    hospital,
  });
});

exports.getHospital = BigPromise(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);
  let doctorInfo = await Promise.all(
    hospital.doctors.map(async (ele) => {
      return await Doctor.findById(ele.doctor);
    })
  );

  if (!hospital) {
    return next(new CustomError("hospital id is invalid", 400));
  }

  res.status(200).json({
    success: true,
    hospital,
    doctorInfo,
  });
});

exports.getAllHospital = BigPromise(async (req, res, next) => {
  const hospitals = await Hospital.find();
  // let doctorInfo = await Promise.all(
  //   hospital.doctors.map(async (ele) => {
  //     return await Doctor.findById(ele.doctor);
  //   })
  // );

  if (!hospitals) {
    return next(new CustomError("hospital id is invalid", 400));
  }

  res.status(200).json({
    success: true,
    hospitals,
    // doctorInfo,
  });
});

exports.updateHospital = BigPromise(async (req, res, next) => {
  const { id, doctor } = req.body;
  const hospital = await Hospital.findById(req.body.id);

  if (!hospital) {
    return next(new CustomError("hospital id is invalid", 400));
  }

  hospital.doctors.push({ doctor });
  await hospital.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    hospital,
  });
});

exports.deleteHospital = BigPromise(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(new CustomError("hospital id is invalid", 400));
  }

  await hospital.remove();

  res.status(200).json({
    success: true,
  });
});
