//import { generateToken } from "./../config/jsonToken.js";

import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import Doctor from "../models/DoctorModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../Utils/jsonToken.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password, name, role, photo, gender, phone } = req.body;

  try {
    let user = null;

    const patientExist = await User.findOne({ email });
    const doctorExist = await Doctor.findOne({ email });

    if (patientExist || doctorExist) {
      return res.status(400).json("User already exists");
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role: "patient",
        phone,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role: "doctor",
        phone,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Successfully Created" });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Your login logic here
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
});
