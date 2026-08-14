import goal from '../database/models/goal.js'


async function create(goalData) {
    return await goal.create(goalData);
};

async function findAllByUser(userId) {
    return await goal.findAll({
        where: {
            id_user: userId,
            active_goal: true
        }
    });
};

async function findById(idGoal, userId) {
    return await goal.findOne({
        where: {
            id_goal: idGoal,
            id_user: userId
        }
    });
};

async function findInactiveByUser(userId) {
    return await goal.findAll({
        where:{
            id_user: userId,
            active_goal: false
        }
    });
};

async function findByName(nameGoal, userId) {
    return await goal.findOne({
        where: {
            name_goal: nameGoal,
            id_user: userId,
            active_goal: true
        }
    });
};

async function update(idGoal, userId, goalData) {
    return await goal.update(
        goalData,
        {
            where: {
                id_goal: idGoal,
                id_user: userId,
                active_goal: true
            }
        }
    );
};

async function activate(idGoal, userId) {
    return await goal.update(
        {
            activae_goal: true,
            deleted_at_goal:null
        },
        {
            where:{
                id_goal: idGoal,
                id_user: userId
            }
        }
    );
};

async function remove(idGoal, userId) {
    return await goal.goal(
        {
            activae_goal: false,
            deleted_at_goal: new Date()
        },
        {
            where: {
                id_goal: idGoal,
                id_user: userId,
                activae_goal: true
            }
        }
    );
};

export default {
    create,
    findAllByUser,
    findById,
    findInactiveByUser,
    findByName,
    update,
    activate,
    remove
}