import category from "../database/models/category.js";

async function create(categoryData) {
    return await category.create(categoryData);
};

async function findAllByUser(userId) {
    return await category.findAll({
        where: {
            id_user: userId,
            active_category: true
        }
    });
};

async function findById(idCategory, userId) {
    return await category.findOne({
        where: {    
            id_category: idCategory,
            id_user: userId
        }
    });
};

async function update(idCategory, userId, categoryData) {
    return await category.update(categoryData, {
        where: {
            id_category: idCategory,
            id_user: userId,
            active_category: true
        }
    });
};

async function activate(idCategory, userId) {
    return await category.update(
        {
            active_category: true,
            deleted_at_category: null
        },
        {
            where: {
                id_category: idCategory,
                id_user: userId
            }
        }
    );
};

async function remove(idCategory, userId) {
    return await category.update(
        {
            active_category: false,
            deleted_at_category: new Date()
        },
        {
            where: {
                id_category: idCategory,
                id_user: userId,
                active_category: true
            }
        }
    );
};

async function findInactiveByUser(userId){
    return await category.findAll({
        where: {
            id_user: userId,
            active_category: false
        }
    });
};

async function findByName(nameCategory, userId) {
    return await category.findOne({
        where: {
            name_category: nameCategory,
            id_user: userId
        }
    });
};

export default {
    create, 
    findById,
    update,
    remove,
    activate,
    findAllByUser,
    findInactiveByUser,
    findByName
};
