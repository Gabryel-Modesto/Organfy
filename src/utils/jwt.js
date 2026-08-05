import jwt from "jsonwebtoken";


//gerar token JWT para o usuário
export function generateToken(user) {
    return jwt.sign(
        { id_user: user.id_user },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};