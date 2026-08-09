import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const category = sequelize.define(
    "Category",
    {
        id_category: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name_category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type_category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        active_category: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at_category",
        updatedAt: "updated_at_category"
    }
);

export default category;