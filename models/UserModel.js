import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  intervals: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  doctor: { type: mongoose.Types.ObjectId, ref: "Doctor" },
  gender: { type: String, enum: ["male", "female", "other"] },
  diagnosis: { type: String, default: "" },
  bloodType: { type: String, default: "" },
  prescriptions: [prescriptionSchema],
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
