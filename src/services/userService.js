import User from "../database/models/user.js";
import bcrypt from "bcryptjs";

async function createUser(userData) {
    validateUser(userData);
    await checkEmailExists(userData.email_user);
    
    // Criptografar a senha
    userData.password_user = await hashPassword(userData.password_user);

    // Criar o usuário no banco de dados
    const user = await User.create(userData);
    return removePassword(user);
};

function validateUser(userData) {
    validateName(userData.name_user);
    validateEmail(userData.email_user);
    validatePassword(userData.password_user);
};

function validateEmail(email){
    if(!email || email.trim() === ""){
        throw new Error("Email é obrigatório");
    }
};

function validatePasswor(password){
    if(!password || password.trim() === ""){
        throw new Error("Senha é obrigatória");
    };
}

function validateName(name){
    if(!name || name.trim() === ""){
        throw new Error("Nome é obrigatório");
    };
};

async function checkEmailExists(email) {
    const existingUser = await User.findOne({ where: { email_user: email } });
    if (existingUser) {
        throw new Error("Email já cadastrado");
    };
};

//criptografar a senha do usuário
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
};

//função para remover a senha do usuário antes de retornar a resposta
function removePassword(user){
    const userResponse = user.toJSON();
    delete userResponse.password_user;
    return userResponse;
};

export default {createUser};