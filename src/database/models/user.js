import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";

class User extends Model{};

User.init(
    {
        id_user:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name_user:{
            type: DataTypes.STRING(150),
            allowNull: false
        },

        email_user:{
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

        password_user:{
            type: DataTypes.STRING(255),
            allowNull: false
        },

        birth_date_user:{
            type: DataTypes.DATEONLY,
            allowNull: true
        }, 

        created_at_user:{
            type: DataTypes.DATE
        },

        updated_at_user:{
            type: DataTypes.DATE
        },

        deleted_at_user:{
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false
    }
);

export default User;