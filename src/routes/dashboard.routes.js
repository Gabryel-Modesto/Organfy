import { Router } from "express";
import dashboardController from "../controllers/dashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/summary",authMiddleware,dashboardController.getSummary);

export default router;