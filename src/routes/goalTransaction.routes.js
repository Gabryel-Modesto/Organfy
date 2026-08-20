import { Router } from "express";
import goalTransactionController from "../controllers/goalTransactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/",authMiddleware,goalTransactionController.create);
router.get("/goal/:id",authMiddleware,goalTransactionController.findByGoal);
router.get("/transaction/:id",authMiddleware,goalTransactionController.findByTransaction);
router.get("/:id",authMiddleware,goalTransactionController.findById);
router.delete("/:id",authMiddleware,goalTransactionController.remove);

export default router;