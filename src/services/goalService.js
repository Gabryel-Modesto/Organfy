import goalRepository from "../repositories/goalRepository.js";

function normalizeGoalName(name) {
  if (!name || name.trim() === "") {
    throw new Error("Nome da meta não pode ser vazio!");
  }

  const normalizedName = name.trim();

  if (normalizedName.length < 3) {
    throw new Error("O nome da meta deve ter ao menos 3 caracteres!");
  }

  if (normalizedName.length > 150) {
    throw new Error("O nome da meta deve ter no máximo 150 caracteres!");
  }

  return normalizedName;
}

function validateGoalAmount(amount) {
  if (amount === undefined || amount === null || amount === "") {
    throw new Error("O valor da meta é obrigatório!");
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    throw new Error("O valor da meta deve ser um número válido!");
  }

  if (numericAmount <= 0) {
    throw new Error("O valor da meta deve ser maior que zero!");
  }

  return numericAmount;
}

function validateGoalDeadline(deadline) {
  if (!deadline) {
    return null;
  }

  const deadlineDate = new Date(deadline);

  if (Number.isNaN(deadlineDate.getTime())) {
    throw new Error("A data da meta é inválida!");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  deadlineDate.setHours(0, 0, 0, 0);

  if (deadlineDate < today) {
    throw new Error("A data limite da meta não pode estar no passado!");
  }

  return deadline;
}

async function create(goalData, userId) {
    const {
        name_goal,
        target_amount_goal,
        deadline_goal
    } = goalData;

    const normalizedName = normalizeGoalName(name_goal);
    const normalizedAmount = validateGoalAmount(target_amount_goal);
    const normalizedDeadline = validateGoalDeadline(deadline_goal);
    const existingGoal = await goalRepository.findByName(normalizedName,userId);

    if (existingGoal) {
        throw new Error("Você já possui uma meta com esse nome!");
    };

    const newGoal = {
        name_goal: normalizedName,
        target_amount_goal: normalizedAmount,
        deadline_goal: normalizedDeadline,
        id_user: userId
    };

    return await goalRepository.create(newGoal);
}

async function findAllByUser(userId) {
  return await goalRepository.findAllByUser(userId);
}

async function findById(idGoal, userId) {
  return await goalRepository.findById(idGoal, userId);
}

async function findInactiveByUser(userId) {
  return await goalRepository.findInactiveByUser(userId);
}

async function update(idGoal, userId, goalData) {
    const {
        name_goal,
        target_amount_goal,
        deadline_goal
    } = goalData;

    const normalizedName = normalizeGoalName(name_goal);
    const normalizedAmount = validateGoalAmount(target_amount_goal);
    const normalizedDeadline = validateGoalDeadline( deadline_goal);
    const existingGoal = await goalRepository.findByName(normalizedName,userId);

    if (existingGoal && existingGoal.id_goal !== Number(idGoal)) {
        throw new Error("Você já possui uma meta com esse nome!");
    };

    const dataToUpdate = {
        name_goal: normalizedName,
        target_amount_goal: normalizedAmount,
        deadline_goal: normalizedDeadline
    };

    return await goalRepository.update(idGoal,userId,dataToUpdate);
}

async function activate(idGoal, userId) {
  return await goalRepository.activate(idGoal, userId);
}

async function remove(idGoal, userId) {
  return await goalRepository.remove(idGoal, userId);
}

export default {
  create,
  findAllByUser,
  findById,
  findInactiveByUser,
  update,
  activate,
  remove,
};
