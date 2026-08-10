export function validateEmail(email) {
    if (!email || email.trim() === "") {
        throw new Error("Email é obrigatório");
    }
};

export function validatePassword(password) {
    if (!password || password.trim() === "") {
        throw new Error("Senha é obrigatória");
    }
};

export function validateName(name) {
    if (!name || name.trim() === "") {
        throw new Error("Nome é obrigatório");
    }
};

export function normalizeCategoryType(type) {
    const types = {
        expense: "EXPENSE",
        income: "INCOME"
    };

    const normalizedType = types[type?.toLowerCase()];

    if (!normalizedType) {
        throw new Error("Tipo de categoria inválido!");
    }

    return normalizedType;
};

export function validateCategoryName(name) {
    if (!name || name.trim() === "") {
        throw new Error("Nome da categoria é obrigatório!");
    }

    const normalizedName = name.trim();

    if (normalizedName.length < 2) {
        throw new Error(
            "O nome da categoria deve ter pelo menos 2 caracteres!"
        );
    }

    if (normalizedName.length > 50) {
        throw new Error(
            "O nome da categoria deve ter no máximo 50 caracteres!"
        );
    }

    return normalizedName;
};