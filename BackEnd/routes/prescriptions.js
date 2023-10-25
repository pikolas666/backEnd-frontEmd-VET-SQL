import express from "express";
import { addPrescription, getPrescriptionsByPetId } from "../controller/prescriptions.js";
  
const router = express.Router();

router.post("/prescriptions", addPrescription);

router.get("/prescriptions/:id", getPrescriptionsByPetId);

export default router;