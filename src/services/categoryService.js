import categoryRepository from "../repositories/categoryRepository.js";

async function create(categoryData, userId) {
    const category = {
        ...categoryData,
        id_user: userId
    };

    return await categoryRepository.create(category);
}

async function findAllByUser(userId) {
    return await categoryRepository.findAllByUser(userId);
}

async function findById(id) {
    return await categoryRepository.findById(id);
}

export default {
    create,
    findAllByUser,
    findById
};