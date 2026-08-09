import {Router} from 'express';
import categoryController from '../controllers/categoryController.js';
import authMiddlewares from '../middlewares/authMiddleware.js'

const router = Router();

router.post("/", authMiddlewares, categoryController.create);
router.get("/", authMiddlewares, categoryController.findAll);
router.get("/:id", authMiddlewares, categoryController.findById);

export default router;