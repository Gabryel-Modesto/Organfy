import category from "../database/models/category.js";

async function create(categoryData) {
    return await category.create(categoryData);
};


//Busca somente as categorias ativas daquele usuário
async function findByUser(userId) {
    return await category.findAll({
        where: {
            id_user: userId,
        }
    });
}

async function findAllByUser(userId) {
    return await category.findAll({
        where: {
            id_user: userId
        }
    });
}

async function findById(id) {
    return await category.findByPk(id);
}

async function update(id, categoryData) {
    return await category.update(categoryData, {
        where: {
            id_category: id
        }
    }
)};

async function activade(id) {
    return await category.update(
        {
            active_category: true
        },
        {
            where: {
                id_category: id
            }
        }
    )
};


async function remove(id) {
    return await category.update(
        {
            active_category: false
        },
        {
            where: {
                id_category: id
            }
        }
    );
}

export default {
    create, 
    findByUser,
    findById,
    update,
    remove,
    activade,
    findAllByUser
};
