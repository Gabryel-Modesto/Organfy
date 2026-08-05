
export function validateEmail(email){
    if(!email || email.trim() === ""){
        throw new Error("Email é obrigatório");
    }
};

export function validatePassword(password){
    if(!password || password.trim() === ""){
        throw new Error("Senha é obrigatória");
    };
}

export function validateName(name){
    if(!name || name.trim() === ""){
        throw new Error("Nome é obrigatório");
    };
};