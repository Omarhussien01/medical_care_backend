import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  addPatientToDoctor,
  removePatientFromDoctor,
} from "../controller/doctorController.js";

import { auth, restrict } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", [auth, restrict("doctor")], updateDoctor);
router.delete("/:id", [auth, restrict("doctor")], deleteDoctor);

router.delete(
  "/patients/:doctorId/:patientId",
  [auth, restrict("doctor")],
  removePatientFromDoctor
);

router.post("/:doctorId", [auth, restrict("doctor")], addPatientToDoctor);

export default router;
