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

        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        name_category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        color_category: {
            type: DataTypes.STRING,
            allowNull: true
        },

        icon_category: {
            type: DataTypes.STRING,
            allowNull: true
        },

        type_category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        active_category: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        deleted_at_category: {
            type: DataTypes.DATE,
            allowNull: true
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