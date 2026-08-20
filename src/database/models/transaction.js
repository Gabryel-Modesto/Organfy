import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const transaction = sequelize.define(
    "Transaction",
    {
        id_transaction: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        description_transaction: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        amount_transaction: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        type_transaction: {
            type: DataTypes.ENUM("Income", "Expense"),
            allowNull: false
        },

        purchase_date_transaction: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        due_date_transaction: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        payment_date_transaction: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        paid_transaction: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        installment_transaction: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        installment_number_transaction: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        total_installments_transaction: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        notes_transaction: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        recurring_transaction: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        deleted_at_transaction: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "transactions",
        timestamps: true,
        createdAt: "created_at_transaction",
        updatedAt: "updated_at_transaction"
    }
);

export default transaction;