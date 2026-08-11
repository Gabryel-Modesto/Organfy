import paymentMethodRepository from "../repositories/paymentMethodRepository.js";

function normalizePaymentMethodName(name) {
  if (!name || name.trim() === "") {
    throw new Error("Nome não pode ser vazio!");
  }

  const normalizedName = name.trim();

  if (normalizedName.length < 3) {
    throw new Error(
      "O nome da forma de pagamento deve ter ao menos 3 caracteres!",
    );
  }

  if (normalizedName.length > 100) {
    throw new Error(
      "O nome da forma de pagamento deve ter no máximo 100 caracteres!",
    );
  }

  return normalizedName;
}

async function create(paymentMethodData, userId) {
  const { name_payment_method } = paymentMethodData;

  const normalizedName = normalizePaymentMethodName(name_payment_method);

  const existingPaymentMethod =
    await paymentMethodRepository.findByName(
        normalizedName,
        userId
    );

 if (existingPaymentMethod) {

    if (!existingPaymentMethod.active_payment_methods) {
        return await paymentMethodRepository.activate(
            existingPaymentMethod.id_payment_method,
            userId
        );
    }

    throw new Error(
        "Você já possui uma forma de pagamento com esse nome!"
    );
}

  const paymentMethod = {
    name_payment_method: normalizedName,
    id_user: userId,
  };

  return await paymentMethodRepository.create(paymentMethod);
}

async function findAllByUser(userId) {
  return await paymentMethodRepository.findAllByUser(userId);
}

async function findInactiveByUser(userId) {
  return await paymentMethodRepository.findInactiveByUser(userId);
}

async function findById(idPaymentMethod, userId) {
  return await paymentMethodRepository.findById(idPaymentMethod, userId);
}

async function update(idPaymentMethod, userId, paymentMethodData) {
  const { name_payment_method } = paymentMethodData;

  const normalizedName = normalizePaymentMethodName(name_payment_method);

  const existingPaymentMethod = await paymentMethodRepository.findByName(
    normalizedName,
    userId,
  );

  if (existingPaymentMethod &&existingPaymentMethod.id_payment_method !== Number(idPaymentMethod)) {
    throw new Error("Você já possui uma forma de pagamento com esse nome!");
  }

  const dataToUpdate = {
    name_payment_method: normalizedName,
  };

  return await paymentMethodRepository.update(
    idPaymentMethod,
    userId,
    dataToUpdate,
  );
}

async function activate(idPaymentMethod, userId) {
  return await paymentMethodRepository.activate(idPaymentMethod, userId);
}

async function remove(idPaymentMethod, userId) {
  return await paymentMethodRepository.remove(idPaymentMethod, userId);
}

export default {
  create,
  findAllByUser,
  findInactiveByUser,
  findById,
  update,
  activate,
  remove,
};
