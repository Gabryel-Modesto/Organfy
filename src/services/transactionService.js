import transactionRepository from "../repositories/transactionRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";
import paymentMethodRepository from "../repositories/paymentMethodRepository.js";


function validateDescription(description) {

    if (!description || description.trim() === "") {
        throw new Error(
            "A descrição da transação não pode ser vazia!"
        );
    }

    const normalizedDescription = description.trim();

    if (normalizedDescription.length < 3) {
        throw new Error(
            "A descrição da transação deve ter ao menos 3 caracteres!"
        );
    }

    if (normalizedDescription.length > 255) {
        throw new Error(
            "A descrição da transação deve ter no máximo 255 caracteres!"
        );
    }

    return normalizedDescription;
};

function validateAmount(amount) {

    if (
        amount === undefined ||
        amount === null ||
        amount === ""
    ) {
        throw new Error(
            "O valor da transação é obrigatório!"
        );
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount)) {
        throw new Error(
            "O valor da transação deve ser um número válido!"
        );
    }

    if (numericAmount <= 0) {
        throw new Error(
            "O valor da transação deve ser maior que zero!"
        );
    }

    return numericAmount;
};

function validateType(type) {

    if (!type) {
        throw new Error(
            "O tipo da transação é obrigatório!"
        );
    }

    if (
        type !== "Income" &&
        type !== "Expense"
    ) {
        throw new Error(
            "O tipo da transação deve ser Income ou Expense!"
        );
    }

    return type;
};

function validateDate(date, fieldName) {

    if (!date) {
        throw new Error(
            `${fieldName} é obrigatória!`
        );
    }

    const dateValue = new Date(date);

    if (Number.isNaN(dateValue.getTime())) {
        throw new Error(
            `${fieldName} é inválida!`
        );
    }

    return date;
};

function validateInstallments(installment,installmentNumber,totalInstallments) {

    if (!installment) {
        return;
    }

    if (
        installmentNumber === undefined ||
        installmentNumber === null ||
        totalInstallments === undefined ||
        totalInstallments === null
    ) {
        throw new Error(
            "Informe o número e o total de parcelas!"
        );
    }

    if (
        installmentNumber <= 0 ||
        totalInstallments <= 0
    ) {
        throw new Error(
            "O número de parcelas deve ser maior que zero!"
        );
    }

    if (
        installmentNumber > totalInstallments
    ) {
        throw new Error(
            "O número da parcela não pode ser maior que o total de parcelas!"
        );
    }
};

async function create(transactionData, userId) {

    const {
        id_category,
        id_payment_method,
        description_transaction,
        amount_transaction,
        type_transaction,
        purchase_date_transaction,
        due_date_transaction,
        payment_date_transaction,
        paid_transaction,
        installment_transaction,
        installment_number_transaction,
        total_installments_transaction,
        notes_transaction,
        recurring_transaction
    } = transactionData;


    const category =
        await categoryRepository.findById(
            id_category,
            userId
        );

    if (!category) {
        throw new Error(
            "Categoria não encontrada ou não pertence ao usuário!"
        );
    }


    const paymentMethod =
        await paymentMethodRepository.findById(
            id_payment_method,
            userId
        );

    if (!paymentMethod) {
        throw new Error(
            "Forma de pagamento não encontrada ou não pertence ao usuário!"
        );
    }


    const normalizedDescription =
        validateDescription(
            description_transaction
        );


    const normalizedAmount =
        validateAmount(
            amount_transaction
        );


    const normalizedType =
        validateType(
            type_transaction
        );


    validateDate(
        purchase_date_transaction,
        "A data da compra"
    );


    validateInstallments(
        installment_transaction,
        installment_number_transaction,
        total_installments_transaction
    );


    const newTransaction = {

        id_user: userId,

        id_category,

        id_payment_method,

        description_transaction:
            normalizedDescription,

        amount_transaction:
            normalizedAmount,

        type_transaction:
            normalizedType,

        purchase_date_transaction,

        due_date_transaction:
            due_date_transaction || null,

        payment_date_transaction:
            payment_date_transaction || null,

        paid_transaction:
            paid_transaction ?? false,

        installment_transaction:
            installment_transaction ?? false,

        installment_number_transaction:
            installment_number_transaction ?? null,

        total_installments_transaction:
            total_installments_transaction ?? null,

        notes_transaction:
            notes_transaction || null,

        recurring_transaction:
            recurring_transaction ?? false
    };


    return await transactionRepository.create(
        newTransaction
    );
};

async function findAllByUser(userId) {

    return await transactionRepository.findAllByUser(
        userId
    );
};

async function findById(idTransaction, userId) {

    return await transactionRepository.findById(
        idTransaction,
        userId
    );
};

async function update(idTransaction,userId,
    transactionData
) {

    const {
        id_category,
        id_payment_method,
        description_transaction,
        amount_transaction,
        type_transaction,
        purchase_date_transaction,
        due_date_transaction,
        payment_date_transaction,
        paid_transaction,
        installment_transaction,
        installment_number_transaction,
        total_installments_transaction,
        notes_transaction,
        recurring_transaction
    } = transactionData;


    const category =
        await categoryRepository.findById(
            id_category,
            userId
        );

    if (!category) {
        throw new Error(
            "Categoria não encontrada ou não pertence ao usuário!"
        );
    }


    const paymentMethod =
        await paymentMethodRepository.findById(
            id_payment_method,
            userId
        );

    if (!paymentMethod) {
        throw new Error(
            "Forma de pagamento não encontrada ou não pertence ao usuário!"
        );
    }


    const normalizedDescription =
        validateDescription(
            description_transaction
        );


    const normalizedAmount =
        validateAmount(
            amount_transaction
        );


    const normalizedType =
        validateType(
            type_transaction
        );


    validateDate(
        purchase_date_transaction,
        "A data da compra"
    );


    validateInstallments(
        installment_transaction,
        installment_number_transaction,
        total_installments_transaction
    );


    const dataToUpdate = {

        id_category,

        id_payment_method,

        description_transaction:
            normalizedDescription,

        amount_transaction:
            normalizedAmount,

        type_transaction:
            normalizedType,

        purchase_date_transaction,

        due_date_transaction:
            due_date_transaction || null,

        payment_date_transaction:
            payment_date_transaction || null,

        paid_transaction:
            paid_transaction ?? false,

        installment_transaction:
            installment_transaction ?? false,

        installment_number_transaction:
            installment_number_transaction ?? null,

        total_installments_transaction:
            total_installments_transaction ?? null,

        notes_transaction:
            notes_transaction || null,

        recurring_transaction:
            recurring_transaction ?? false
    };


    return await transactionRepository.update(
        idTransaction,
        userId,
        dataToUpdate
    );
};

async function remove(idTransaction, userId) {

    return await transactionRepository.remove(
        idTransaction,
        userId
    );
};

export default {
    create,
    findAllByUser,
    findById,
    update,
    remove
};