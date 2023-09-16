import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../controller/userController.js";

import { auth, restrict } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleUser);
router.get("/", getAllUsers);
router.put("/:id", [auth, restrict("doctor")], updateUser);
router.delete("/:id", [auth, restrict("doctor")], deleteUser);

export default router;
