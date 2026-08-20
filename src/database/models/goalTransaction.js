import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const goalTransaction = sequelize.define(
    "GoalTransaction",
    {
        id_goal_transaction: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_goal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_transaction: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        deleted_at_goal_transaction: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "goal_transactions",
        timestamps: true,
        createdAt: "created_at_goal_transaction",
        updatedAt: "updated_at_goal_transaction"
    }
);

export default goalTransaction;