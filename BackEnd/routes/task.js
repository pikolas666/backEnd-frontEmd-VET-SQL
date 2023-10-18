import express from "express";
import {
  addCar,
  getCars,
  getCarById,
  deleteCarById,
  } from "../controller/task.js";

const router = express.Router();

router.post("/cars", addCar);
router.get("/cars", getCars);
router.get("/cars/:id", getCarById);
router.delete("/cars/:id", deleteCarById);

export default router;