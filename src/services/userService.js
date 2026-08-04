import User from "../database/models/user.js";
import bcrypt from "bcryptjs";

//função para criar um usuário
async function createUser(userData) {
    validateUser(userData);

    // Verificar se o email já existe no banco de dados
    await checkEmailExists(userData.email_user);

    // Criptografar a senha
    userData.password_user = await hashPassword(userData.password_user);

    // Criar o usuário no banco de dados
    const user = await User.create(userData);
    
    // Remover a senha do objeto de resposta antes de retornar
    const userResponse = user.toJSON();
    delete userResponse.password_user;

    // Retornar o usuário criado sem a senha
    return userResponse;
};

//validar os dados do usuário
function validateUser(userData) {
    if (!userData.name_user || userData.name_user.trim() === "") {
        throw new Error("Nome é obrigatório");
    };

    if( !userData.email_user || userData.email_user.trim() === "") {
        throw new Error("Email é obrigatório");
    };

    if(!userData.password_user || userData.password_user.trim() === "") {
        throw new Error("Senha é obrigatória");
    };
};

// verificar se o email já existe no banco de dados
async function checkEmailExists(email) {
    const existingUser = await User.findOne({ where: { email_user: email } });
    if (existingUser) {
        throw new Error("Email já cadastrado");
    };
};

//criptografar a senha do usuário
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}


export default {createUser};