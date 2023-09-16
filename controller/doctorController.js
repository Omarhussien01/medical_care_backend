import Doctor from "../models/DoctorModel.js";
import User from "../models/UserModel.js";

import asyncHandler from "express-async-handler";

export const updateDoctor = asyncHandler(async (req, res) => {
  try {
    // Your update logic here
    const { id } = req.params;
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    console.log(id);
    res.status(200).json({ success: true, data: updateDoctor });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Your delete logic here
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: deletedDoctor });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
});

export const getSingleDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Your get single doctor logic here
    const doctor = await Doctor.findById(id).select("-password");
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
});

export const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    // Your get all doctors logic here
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({}).select("-password");
    }
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
});

//Add patients to Doctor and also add the doctor to the patient's doctor field

export const addPatientToDoctor = asyncHandler(async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { patientId } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const patient = await User.findById(patientId); // Find the patient

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the patient is already associated with the doctor
    if (doctor.patients.includes(patientId)) {
      return res
        .status(400)
        .json({ error: "Patient already associated with this doctor" });
    }

    // Update the patient's doctor field
    patient.doctor = doctorId;
    await patient.save();

    doctor.patients.push(patientId);
    await doctor.save();

    res
      .status(200)
      .json({ success: true, message: "Patient added to the doctor" });
  } catch (error) {
    throw new Error(error);
  }
});

//remove patient from doctor and also remove the doctor from patient's doctor field

export const removePatientFromDoctor = asyncHandler(async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    const patient = await User.findById(patientId); // Find the patient

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the patient is associated with the doctor
    if (!doctor.patients.includes(patientId)) {
      return res
        .status(404)
        .json({ error: "Patient not associated with this doctor" });
    }

    // Remove the patient from the doctor's patients array
    doctor.patients = doctor.patients.filter(
      (id) => id.toString() !== patientId
    );
    await doctor.save();

    // Update the patient's doctor field to null
    patient.doctor = null;
    await patient.save();

    res
      .status(200)
      .json({ success: true, message: "Patient removed from the doctor" });
  } catch (error) {
    throw new Error(error);
  }
});
