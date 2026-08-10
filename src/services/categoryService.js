import categoryRepository from "../repositories/categoryRepository.js";
import {
    normalizeCategoryType,
    validateCategoryName,
} from "../utils/validation.js";


async function create(categoryData, userId) {
    const {
        name_category,
        color_category,
        icon_category,
        type_category
    } = categoryData;

    const normalizedName = validateCategoryName(name_category);
    const normalizedType = normalizeCategoryType(type_category);

    const existingCategory = await categoryRepository.findByName(
        normalizedName,
        userId
    );

    if (existingCategory) {

        if (!existingCategory.active_category) {
            return await categoryRepository.activate(
                existingCategory.id_category,
                userId
            );
        }

        throw new Error(
            "Você já possui uma categoria com esse nome!"
        );
    }

    const category = {
        name_category: normalizedName,
        color_category,
        icon_category,
        type_category: normalizedType,
        id_user: userId
    };

    return await categoryRepository.create(category);
}


async function findAllByUser(userId) {
    return await categoryRepository.findAllByUser(userId);
}


async function findInactiveByUser(userId) {
    return await categoryRepository.findInactiveByUser(userId);
}


async function update(idCategory, userId, categoryData) {
    const {
        name_category,
        color_category,
        icon_category,
        type_category
    } = categoryData;

    const normalizedName = validateCategoryName(name_category);
    const normalizedType = normalizeCategoryType(type_category);

    const dataToUpdate = {
        name_category: normalizedName,
        color_category,
        icon_category,
        type_category: normalizedType
    };

    return await categoryRepository.update(
        idCategory,
        userId,
        dataToUpdate
    );
}


async function activate(idCategory, userId) {
    return await categoryRepository.activate(
        idCategory,
        userId
    );
}


async function remove(idCategory, userId) {
    return await categoryRepository.remove(
        idCategory,
        userId
    );
}


async function findById(idCategory, userId) {
    return await categoryRepository.findById(
        idCategory,
        userId
    );
}


export default {
    create,
    findAllByUser,
    update,
    remove,
    activate,
    findInactiveByUser,
    findById
};