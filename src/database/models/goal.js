import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const goal = sequelize.define(
    "goal",
    {
        id_goal:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },

        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        name_goal: {
            type: DataTypes.STRING,
            allowNull:false
        },

        target_amount_goal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        deadline_goal: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        active_goal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        deleted_at_goal: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "goals",
        timestamps: true,
        createdAt: "created_at_goal",
        updatedAt: "updated_at_goal"
    }
);

export default goal;