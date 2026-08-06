import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", authController.login);

router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Usuário autenticado!",
        user: req.user
    });
});

export default router;