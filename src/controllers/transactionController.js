import transactionService from "../services/transactionService.js";

class TransactionController {

    async create(req, res) {

        try {

            const transaction =
                await transactionService.create(
                    req.body,
                    req.user.id_user
                );

            return res.status(201).json(transaction);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findAll(req, res) {

        try {

            const transactions =
                await transactionService.findAllByUser(
                    req.user.id_user
                );

            return res.status(200).json(transactions);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findById(req, res) {

        try {

            const transaction =
                await transactionService.findById(
                    req.params.id,
                    req.user.id_user
                );

            if (!transaction) {

                return res.status(404).json({
                    message: "Transação não encontrada!"
                });
            }

            return res.status(200).json(transaction);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }

    async update(req, res) {

        try {

            const allowedFields = [

                "id_category",

                "id_payment_method",

                "description_transaction",

                "amount_transaction",

                "type_transaction",

                "purchase_date_transaction",

                "due_date_transaction",

                "payment_date_transaction",

                "paid_transaction",

                "installment_transaction",

                "installment_number_transaction",

                "total_installments_transaction",

                "notes_transaction",

                "recurring_transaction"
            ];


            const invalidFields =
                Object.keys(req.body).filter(
                    field =>
                        !allowedFields.includes(field)
                );


            if (invalidFields.length > 0) {

                return res.status(400).json({
                    message:
                        "Existem campos não permitidos na requisição.",
                    fields: invalidFields
                });
            }


            const result =
                await transactionService.update(
                    req.params.id,
                    req.user.id_user,
                    req.body
                );


            if (result[0] === 0) {

                return res.status(404).json({
                    message:
                        "Transação não encontrada!"
                });
            }


            return res.status(200).json({

                message:
                    "Transação atualizada com sucesso!"
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
                await transactionService.remove(
                    req.params.id,
                    req.user.id_user
                );


            if (result[0] === 0) {

                return res.status(404).json({
                    message:
                        "Transação não encontrada!"
                });
            }


            return res.status(200).json({

                message:
                    "Transação removida com sucesso!"
            });

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }
};


export default new TransactionController();