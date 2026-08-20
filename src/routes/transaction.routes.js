import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/",authMiddleware,transactionController.create);
router.get("/",authMiddleware,transactionController.findAll);
router.get("/:id",authMiddleware,transactionController.findById);
router.put("/:id",authMiddleware,transactionController.update);
router.delete("/:id",authMiddleware,transactionController.remove);

export default router;