
import express from "express";
import { addTrekkingPackage } from '../controllers/pakageController.js'

const router = express.Router();

router.post("/add-trekking-package", addTrekkingPackage);

export default router;
