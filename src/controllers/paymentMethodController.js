import paymentMethodService from "../services/paymentMethodService.js";

class PaymentMethodController {

    async create(req, res) {
        try {
            const paymentMethod = await paymentMethodService.create(
                req.body,
                req.user.id_user
            );

            return res.status(201).json(paymentMethod);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findAll(req, res) {
        try {
            const paymentMethods = await paymentMethodService.findAllByUser(
                    req.user.id_user
                );

            return res.status(200).json(paymentMethods);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findInactiveByUser(req, res) {
        try {
            const paymentMethods = await paymentMethodService.findInactiveByUser(
                    req.user.id_user
                );

            return res.status(200).json(paymentMethods);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findById(req, res) {
        try {
            const paymentMethod = await paymentMethodService.findById(
                    req.params.id,
                    req.user.id_user
                );

            if (!paymentMethod) {
                return res.status(404).json({
                    message: "Forma de pagamento não encontrada!"
                });
            }

            return res.status(200).json(paymentMethod);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const allowedFields = [
                "name_payment_method"
            ];

            const invalidFields = Object.keys(req.body).filter(
                (field) => !allowedFields.includes(field)
            );

            if (invalidFields.length > 0) {
                return res.status(400).json({
                    message: "Existem campos não permitidos na requisição."
                });
            }

            const result = await paymentMethodService.update(
                    req.params.id,
                    req.user.id_user,
                    req.body
                );

            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Forma de pagamento não encontrada!"
                });
            }

            return res.status(200).json({
                message: "Forma de pagamento atualizada com sucesso!"
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async remove(req, res) {
        try {
            const result =
                await paymentMethodService.remove(
                    req.params.id,
                    req.user.id_user
                );

            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Forma de pagamento não encontrada!"
                });
            }

            return res.status(200).json({
                message: "Forma de pagamento removida com sucesso!"
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async activate(req, res) {
        try {
            const result =
                await paymentMethodService.activate(
                    req.params.id,
                    req.user.id_user
                );

            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Forma de pagamento não encontrada!"
                });
            }

            return res.status(200).json({
                message: "Forma de pagamento ativada com sucesso!"
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
}

export default new PaymentMethodController();