import userRepository from "../repositories/userRepository.js";
import { validateEmail, validatePassword, validateName } from "../utils/validation.js";
import { hashPassword } from "../utils/password.js";
import { removePassword } from "../utils/sanitize.js";

async function createUser(userData) {
    const { name_user, email_user, password_user } = userData;

    validateUser(userData);
    await checkEmailExists(email_user);

    // Criptografar a senha do usuário antes de salvar no banco de dados
    userData.password_user = await hashPassword(password_user);

    const user = await userRepository.create(userData);

    return removePassword(user);
}

function validateUser(userData) {
    const { name_user, email_user, password_user } = userData;

    validateName(name_user);
    validateEmail(email_user);
    validatePassword(password_user);
}

async function checkEmailExists(email) {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new Error("Email já cadastrado");
    }
}

export default { createUser };