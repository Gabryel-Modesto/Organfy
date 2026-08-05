import userRepository from "../repositories/userRepository.js";
import { validateEmail, validatePassword } from "../utils/validation.js";
import { comparePassword } from "../utils/password.js";
import { removePassword } from "../utils/sanitize.js";
import { generateToken } from "../utils/jwt.js";

async function login(loginData) {
    validateLogin(loginData);

    const { email_user, password_user } = loginData;

    const user = await userRepository.findByEmail(email_user);

    if (!user) {
        throw new Error("Email ou senha inválidos");
    }

    const isPasswordValid = await comparePassword(
        password_user,
        user.password_user
    );

    if (!isPasswordValid) {
        throw new Error("Email ou senha inválidos");
    }

    const token = generateToken(user);

    // Retorna o token JWT junto com os dados do usuário
    return {
         user: removePassword(user),
         token
    };
}

function validateLogin(loginData) {
    const { email_user, password_user } = loginData;

    validateEmail(email_user);
    validatePassword(password_user);
}

export default {
    login
};