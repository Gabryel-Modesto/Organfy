import { Router } from "express";
import goalController from "../controllers/goalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/",authMiddleware,goalController.create);
router.get("/",authMiddleware,goalController.findAll);
router.get("/inactive",authMiddleware,goalController.findInactiveByUser);
router.get("/:id",authMiddleware,goalController.findById);
router.put("/:id",authMiddleware,goalController.update);
router.patch("/:id",authMiddleware,goalController.activate);
router.delete("/:id",authMiddleware,goalController.remove);


export default router;