import express from "express";
import {
  addPet,
  getPets,
  getPetById,
  deletePetById,
  } from "../controller/pet.js";
  

const router = express.Router();

router.post("/pets", addPet);
router.get("/pets", getPets);
router.get("/pets/:id", getPetById);
router.delete("/pets/:id", deletePetById);

export default router;