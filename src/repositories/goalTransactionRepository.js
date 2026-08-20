import goalTransaction from "../database/models/goalTransaction.js";


async function create(goalTransactionData) {

    return await goalTransaction.create(
        goalTransactionData
    );
};

async function findById(idGoalTransaction) {

    return await goalTransaction.findOne({

        where: {

            id_goal_transaction:
                idGoalTransaction,

            deleted_at_goal_transaction:
                null
        }
    });
};

async function findByGoal(idGoal) {

    return await goalTransaction.findAll({

        where: {

            id_goal: idGoal,

            deleted_at_goal_transaction:
                null
        }
    });
};

async function findByTransaction(idTransaction) {

    return await goalTransaction.findOne({

        where: {

            id_transaction:
                idTransaction,

            deleted_at_goal_transaction:
                null
        }
    });
};

async function remove(idGoalTransaction) {

    return await goalTransaction.update(

        {

            deleted_at_goal_transaction:
                new Date()

        },

        {

            where: {

                id_goal_transaction:
                    idGoalTransaction,

                deleted_at_goal_transaction:
                    null
            }
        }
    );
};

export default {

    create,
    findById,
    findByGoal,
    findByTransaction,
    remove

};