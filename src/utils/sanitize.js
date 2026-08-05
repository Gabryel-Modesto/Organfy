//funcao para remover a senha do usuário antes de enviar a resposta
export function removePassword(user) {
    const userResponse = user.toJSON();
    delete userResponse.password_user;
    return userResponse;
}