import transaction from "../database/models/transaction.js";
import category from "../database/models/category.js";
import { Op } from "sequelize";

async function getTotalIncome(userId,startDate,endDate) {
    return await transaction.sum(
        "amount_transaction",
        {
            where: {
                id_user: userId,

                type_transaction: "Income",

                purchase_date_transaction: {
                    [Op.between]: [
                        startDate,
                        endDate
                    ]
                },

                deleted_at_transaction: null
            }
        }
    );
}


async function getTotalExpense(userId,startDate,endDate) {
    return await transaction.sum(
        "amount_transaction",
        {
            where: {
                id_user: userId,

                type_transaction: "Expense",

                purchase_date_transaction: {
                    [Op.between]: [
                        startDate,
                        endDate
                    ]
                },

                deleted_at_transaction: null
            }
        }
    );
}


async function getPendingExpenses(userId) {
    return await transaction.sum(
        "amount_transaction",
        {
            where: {
                id_user: userId,

                type_transaction: "Expense",

                paid_transaction: false,

                deleted_at_transaction: null
            }
        }
    );
}


async function getExpensesByCategory(
    userId,
    startDate,
    endDate
) {

    return await transaction.findAll({

        attributes: [
            "id_category",

            [
                transaction.sequelize.fn(
                    "SUM",
                    transaction.sequelize.col(
                        "amount_transaction"
                    )
                ),
                "total"
            ]
        ],

        where: {
            id_user: userId,

            type_transaction: "Expense",

            purchase_date_transaction: {
                [Op.between]: [
                    startDate,
                    endDate
                ]
            },

            deleted_at_transaction: null
        },

        include: [
            {
                model: category,

                attributes: [
                    "id_category",
                    "name_category",
                    "color_category",
                    "icon_category"
                ],

                required: true
            }
        ],

        group: [
            "transaction.id_category",
            "category.id_category"
        ],

        order: [
            [
                transaction.sequelize.literal(
                    "total"
                ),
                "DESC"
            ]
        ]
    });
}


async function getFinancialEvolution(userId,startDate,endDate) {
    return await transaction.findAll({

        attributes: [

            [
                transaction.sequelize.fn(
                    "TO_CHAR",
                    transaction.sequelize.col(
                        "purchase_date_transaction"
                    ),
                    "YYYY-MM"
                ),
                "period"
            ],

            "type_transaction",

            [
                transaction.sequelize.fn(
                    "SUM",
                    transaction.sequelize.col(
                        "amount_transaction"
                    )
                ),
                "total"
            ]
        ],

        where: {
            id_user: userId,

            purchase_date_transaction: {
                [Op.between]: [
                    startDate,
                    endDate
                ]
            },

            deleted_at_transaction: null
        },

        group: [

            transaction.sequelize.fn(
                "TO_CHAR",
                transaction.sequelize.col(
                    "purchase_date_transaction"
                ),
                "YYYY-MM"
            ),

            "type_transaction"
        ],

        order: [

            [
                transaction.sequelize.fn(
                    "TO_CHAR",
                    transaction.sequelize.col(
                        "purchase_date_transaction"
                    ),
                    "YYYY-MM"
                ),
                "ASC"
            ]
        ]
    });
};

export default {

    getTotalIncome,
    getTotalExpense,
    getPendingExpenses,
    getExpensesByCategory,
    getFinancialEvolution

};