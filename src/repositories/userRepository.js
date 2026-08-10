import User from "../database/models/user.js";

async function create(userData) {
    return await User.create(userData);
};

async function findByEmail(email) {
    return await User.findOne({
        where: {
            email_user: email
        }
    });
};

async function findById(id) {
    return await User.findByPk(id);
};

export default {
    create,
    findByEmail,
    findById
};