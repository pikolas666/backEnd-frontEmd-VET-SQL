import express from "express";
import {
  addLog, updateLog ,getLogsByPetId 
  } from "../controller/logs.js";
  

const router = express.Router();

router.post("/logs", addLog);
router.put("/logs/:id", updateLog);
router.get("/logs/:id", getLogsByPetId);
export default router;