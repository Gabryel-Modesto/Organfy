import paymentMethod from "../database/models/paymentMethod.js";


async function create(paymentMethodData) {
    return await paymentMethod.create(paymentMethodData);
}


async function findAllByUser(userId) {
    return await paymentMethod.findAll({
        where: {
            id_user: userId,
            active_payment_methods: true
        }
    });
}


async function findById(idPaymentMethod, userId) {
    return await paymentMethod.findOne({
        where: {
            id_payment_method: idPaymentMethod,
            id_user: userId,
            active_payment_methods: true,
            deleted_at_payment_methods: null
        }
    });
}


async function findInactiveByUser(userId) {
    return await paymentMethod.findAll({
        where: {
            id_user: userId,
            active_payment_methods: false
        }
    });
}


async function findByName(namePaymentMethod, userId) {
    return await paymentMethod.findOne({
        where: {
            name_payment_method: namePaymentMethod,
            id_user: userId
        }
    });
}


async function update(idPaymentMethod,userId,paymentMethodData) {
    return await paymentMethod.update(
        paymentMethodData,
        {
            where: {
                id_payment_method: idPaymentMethod,
                id_user: userId,
                active_payment_methods: true
            }
        }
    );
}


async function activate(idPaymentMethod, userId) {
    return await paymentMethod.update(
        {
            active_payment_methods: true,
            deleted_at_payment_methods: null
        },
        {
            where: {
                id_payment_method: idPaymentMethod,
                id_user: userId
            }
        }
    );
}


async function remove(idPaymentMethod, userId) {
    return await paymentMethod.update(
        {
            active_payment_methods: false,
            deleted_at_payment_methods: new Date()
        },
        {
            where: {
                id_payment_method: idPaymentMethod,
                id_user: userId,
                active_payment_methods: true
            }
        }
    );
}


export default {
    create,
    findAllByUser,
    findById,
    findInactiveByUser,
    findByName,
    update,
    activate,
    remove
};