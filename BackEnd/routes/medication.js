import express from "express";
import {
  addMedication,
  getMedications
  } from "../controller/medications.js";
  

const router = express.Router();

router.post("/medications", addMedication);
router.get("/medications", getMedications);

export default router;