import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddlewares from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddlewares, categoryController.create);
router.get("/", authMiddlewares, categoryController.findAll);
router.get("/inactive",authMiddlewares, categoryController.findInactiveByUser);
router.get("/:id", authMiddlewares, categoryController.findById);
router.put("/:id", authMiddlewares, categoryController.update);
router.delete("/:id", authMiddlewares, categoryController.remove);
router.patch("/:id/activate",authMiddlewares,categoryController.activate);

export default router;