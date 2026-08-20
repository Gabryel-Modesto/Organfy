import transaction from "../database/models/transaction.js";

async function create(transactionData) {
    return await transaction.create(transactionData);
};


async function findAllByUser(userId) {
    return await transaction.findAll({
        where: {
            id_user: userId,
            deleted_at_transaction: null
        }
    });
};


async function findById(idTransaction, userId) {
    return await transaction.findOne({
        where: {
            id_transaction: idTransaction,
            id_user: userId,
            deleted_at_transaction: null
        }
    });
};


async function update(
    idTransaction,
    userId,
    transactionData
) {
    return await transaction.update(
        transactionData,
        {
            where: {
                id_transaction: idTransaction,
                id_user: userId,
                deleted_at_transaction: null
            }
        }
    );
};


async function remove(idTransaction, userId) {
    return await transaction.update(
        {
            deleted_at_transaction: new Date()
        },
        {
            where: {
                id_transaction: idTransaction,
                id_user: userId,
                deleted_at_transaction: null
            }
        }
    );
};


export default {
    create,
    findAllByUser,
    findById,
    update,
    remove
};