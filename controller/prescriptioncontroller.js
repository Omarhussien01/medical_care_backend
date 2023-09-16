import User from "../models/UserModel.js";
import { sendEmail } from "../Utils/nodeMailer.js";
import asyncHandler from "express-async-handler";

export const createPrescription = asyncHandler(async (req, res) => {
  try {
    const { name, intervals, instructions } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPrescription = {
      name,
      intervals,
      instructions,
    };

    user.prescriptions.push(newPrescription);
    await user.save();
    sendEmail(
      user.email,
      "New Prescription Created on Voithy",
      "A new prescription has been created. Please check your account for New prescription"
    );
    res.status(201).json(newPrescription);
  } catch (error) {
    throw new Error(error);
  }
});

export const getPrescriptions = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.prescriptions);
  } catch (error) {
    throw new Error(error);
  }
});

export const updatePrescriptions = asyncHandler(async (req, res) => {
  try {
    const { name, intervals, instructions } = req.body;
    const userId = req.params.userId;
    const prescriptionId = req.params.prescriptionId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const prescriptionToUpdate = user.prescriptions.id(prescriptionId);

    if (!prescriptionToUpdate) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    prescriptionToUpdate.set({
      name,
      intervals,
      instructions,
    });

    await user.save();
    sendEmail(
      user.email,
      "New Prescription Updated on Voithy",
      "A new prescription has been Updated. Please check your account for New prescription"
    );
    res.status(200).json(prescriptionToUpdate);
  } catch (error) {
    throw new Error(error);
  }
});

export const deletePrescription = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const prescriptionId = req.params.prescriptionId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the prescription to delete
    const prescriptionIndex = user.prescriptions.findIndex(
      (prescription) => prescription._id.toString() === prescriptionId
    );

    if (prescriptionIndex === -1) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    // Remove the prescription from the user's prescriptions array
    user.prescriptions.splice(prescriptionIndex, 1);

    // Save the user to update the prescription deletion
    await user.save();
    //sending mail notification
    sendEmail(
      user.email,
      "Prescription Deleted on Voithy",
      "A  prescription has been Deleted. Please check your account for updates"
    );
    res.status(204).end();
  } catch (error) {
    throw new Error(error);
  }
});
