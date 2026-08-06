import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { removePassword } from "../utils/sanitize.js";

// Middleware de autenticação
export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não fornecido"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o usuário no banco
        const user = await userRepository.findById(decoded.id_user);

        if (!user) {
            return res.status(401).json({
                message: "Usuário não encontrado"
            });
        }

        // Disponibiliza o usuário para as próximas camadas
        req.user = removePassword(user);

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido"
        });
    }
};