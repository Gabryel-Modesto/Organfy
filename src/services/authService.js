import userRepository from "../repositories/userRepository.js";
import { validateEmail, validatePassword } from "../utils/validation.js";
import { comparePassword } from "../utils/password.js";
import { removePassword } from "../utils/sanitize.js";

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

    return removePassword(user);
}

function validateLogin(loginData) {
    const { email_user, password_user } = loginData;

    validateEmail(email_user);
    validatePassword(password_user);
}

export default {
    login
};