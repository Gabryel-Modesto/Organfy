import { Router } from "express";
import paymentMethodController from "../controllers/paymentMethodController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, paymentMethodController. create);
router.get("/", authMiddleware, paymentMethodController.findAll);
router.get("/inactive", authMiddleware, paymentMethodController.findInactiveByUser);
router.get("/:id", authMiddleware, paymentMethodController.findById);
router.put("/:id", authMiddleware, paymentMethodController.update);
router.patch("/:id", authMiddleware, paymentMethodController.activate);
router.delete("/:id", authMiddleware, paymentMethodController.remove);

export default router;