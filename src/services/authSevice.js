function validateEmailUserLogin(email){
    if(!email || email.trim() === ""){
        throw new Error("Email é obrigatório");
    };
};


function validatePasswordUserLogin(password){
    if(!password || password.trim() === ""){
        throw new Error("Senha é obrigatória");
    };
};

