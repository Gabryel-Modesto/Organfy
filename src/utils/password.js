import bcrypt from "bcryptjs";

//criptografar a senha do usuário
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
};

//comparar a senha do usuário com a senha criptografada
export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};
