import {
    user,
    category,
    paymentMethod,
    goal,
    transaction,
    goalTransaction
} from "./models/index.js";


// USER → CATEGORY

user.hasMany(category, {
    foreignKey: "id_user"
});

category.belongsTo(user, {
    foreignKey: "id_user"
});


// USER → PAYMENT METHOD

user.hasMany(paymentMethod, {
    foreignKey: "id_user"
});

paymentMethod.belongsTo(user, {
    foreignKey: "id_user"
});


// USER → GOAL

user.hasMany(goal, {
    foreignKey: "id_user"
});

goal.belongsTo(user, {
    foreignKey: "id_user"
});


// USER → TRANSACTION

user.hasMany(transaction, {
    foreignKey: "id_user"
});

transaction.belongsTo(user, {
    foreignKey: "id_user"
});


// CATEGORY → TRANSACTION

category.hasMany(transaction, {
    foreignKey: "id_category"
});

transaction.belongsTo(category, {
    foreignKey: "id_category"
});


// PAYMENT METHOD → TRANSACTION

paymentMethod.hasMany(transaction, {
    foreignKey: "id_payment_method"
});

transaction.belongsTo(paymentMethod, {
    foreignKey: "id_payment_method"
});


// GOAL → GOAL TRANSACTION

goal.hasMany(goalTransaction, {
    foreignKey: "id_goal"
});

goalTransaction.belongsTo(goal, {
    foreignKey: "id_goal"
});


// TRANSACTION → GOAL TRANSACTION

transaction.hasOne(goalTransaction, {
    foreignKey: "id_transaction"
});

goalTransaction.belongsTo(transaction, {
    foreignKey: "id_transaction"
});