    import { DataTypes } from "sequelize";
    import sequelize from "../../config/database.js";

    const paymentMethod = sequelize.define(
        "PaymentMethod",
        {
            id_payment_method: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }, 
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            name_payment_method: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
            active_payment_methods: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            
            deleted_at_payment_methods: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: "payment_methods",
            timestamps: true,
            createdAt: "created_at_payment_methods",
            updatedAt: "updated_at_payment_methods"
        }
    )

export default paymentMethod;