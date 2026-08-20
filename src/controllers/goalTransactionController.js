import goalTransactionService from "../services/goalTransactionService.js";

class GoalTransactionController {

    async create(req, res) {
        try {

            const goalTransaction =
                await goalTransactionService.create(
                    req.body,
                    req.user.id_user
                );

            return res.status(201).json(
                goalTransaction
            );

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findByGoal(req, res) {
        try {

            const goalTransactions =
                await goalTransactionService.findByGoal(
                    req.params.id,
                    req.user.id_user
                );

            return res.status(200).json(
                goalTransactions
            );

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }


    async findById(req, res) {
        try {

            const goalTransaction =
                await goalTransactionService.findById(
                    req.params.id
                );

            if (!goalTransaction) {

                return res.status(404).json({
                    message:
                        "Vínculo entre meta e transação não encontrado!"
                });
            }

            return res.status(200).json(
                goalTransaction
            );

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }


    async findByTransaction(req, res) {
        try {

            const goalTransaction =
                await goalTransactionService.findByTransaction(
                    req.params.id
                );

            if (!goalTransaction) {

                return res.status(404).json({
                    message:
                        "Essa transação não está vinculada a nenhuma meta!"
                });
            }

            return res.status(200).json(
                goalTransaction
            );

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }


    async remove(req, res) {
        try {

            await goalTransactionService.remove(
                req.params.id
            );

            return res.status(200).json({
                message:
                    "Vínculo entre meta e transação removido com sucesso!"
            });

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }
;}

export default new GoalTransactionController();