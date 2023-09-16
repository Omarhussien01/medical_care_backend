import express from "express";
import { auth,restrict } from "../middleware/verifyToken.js";

import { createPrescription,getPrescriptions,updatePrescriptions,deletePrescription } from "../controller/prescriptioncontroller.js";

const router = express.Router();

router.post('/:userId',[auth,restrict('doctor')],createPrescription)
router.get('/:userId',auth,getPrescriptions)
router.put('/:userId/:prescriptionId',[[auth,restrict('doctor')]],updatePrescriptions)
router.delete('/:userId/:prescriptionId',[[auth,restrict('doctor')]],deletePrescription)

export default router;