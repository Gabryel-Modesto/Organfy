import goalTransactionRepository from "../repositories/goalTransactionRepository.js";
import goalRepository from "../repositories/goalRepository.js";
import transactionRepository from "../repositories/transactionRepository.js";


async function create(goalTransactionData, userId) {

    const {
        id_goal,
        id_transaction
    } = goalTransactionData;


    if (!id_goal || !id_transaction) {
        throw new Error(
            "Meta e transação são obrigatórias!"
        );
    }


    const goal = await goalRepository.findById(
        id_goal,
        userId
    );

    if (!goal) {
        throw new Error(
            "Meta não encontrada!"
        );
    }


    const transaction =
        await transactionRepository.findById(
            id_transaction,
            userId
        );

    if (!transaction) {
        throw new Error(
            "Transação não encontrada!"
        );
    }


    if (transaction.type_transaction !== "Expense") {
        throw new Error(
            "Somente despesas podem ser vinculadas a uma meta!"
        );
    }


    const existingGoalTransaction =
        await goalTransactionRepository.findByTransaction(
            id_transaction
        );

    if (existingGoalTransaction) {
        throw new Error(
            "Essa transação já está vinculada a uma meta!"
        );
    }


    const goalTransaction = {
        id_goal,
        id_transaction
    };


    return await goalTransactionRepository.create(
        goalTransaction
    );
}

async function findByGoal(idGoal, userId) {

    const goal = await goalRepository.findById(
        idGoal,
        userId
    );

    if (!goal) {
        throw new Error(
            "Meta não encontrada!"
        );
    }


    return await goalTransactionRepository.findByGoal(
        idGoal
    );
};

async function findById(idGoalTransaction) {

    return await goalTransactionRepository.findById(
        idGoalTransaction
    );
};

async function findByTransaction(idTransaction) {

    return await goalTransactionRepository.findByTransaction(
        idTransaction
    );
};

async function remove(idGoalTransaction) {

    const result =
        await goalTransactionRepository.remove(
            idGoalTransaction
        );


    if (result[0] === 0) {
        throw new Error(
            "Vínculo entre meta e transação não encontrado!"
        );
    }


    return result;
};

export default {
    create,
    findByGoal,
    findById,
    findByTransaction,
    remove
};