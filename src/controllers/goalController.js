import goalService from "../services/goalService.js";

class GoalController {

    async create(req, res) {
        try {
            const goal = await goalService.create(
                req.body,
                req.user.id_user
            );

            return res.status(201).json(goal);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async findAll(req, res) {
        try {
            const goals = await goalService.findAllByUser(
                req.user.id_user
            );

            return res.status(200).json(goals);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async findById(req, res) {
        try {
            const goal = await goalService.findById(
                req.params.id,
                req.user.id_user
            );

            if (!goal) {
                return res.status(404).json({
                    message: "Meta não encontrada!"
                });
            }

            return res.status(200).json(goal);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async findInactiveByUser(req, res) {
        try {
            const goals = await goalService.findInactiveByUser(
                req.user.id_user
            );

            return res.status(200).json(goals);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async update(req, res) {
        try {
            const allowedFields = [
                "name_goal",
                "target_amount_goal",
                "deadline_goal"
            ];

            const invalidFields = Object.keys(req.body).filter(
                (field) => !allowedFields.includes(field)
            );

            if (invalidFields.length > 0) {
                return res.status(400).json({
                    message: "Existem campos não permitidos na requisição."
                });
            }

            const result = await goalService.update(
                req.params.id,
                req.user.id_user,
                req.body
            );

            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Meta não encontrada!"
                });
            }

            return res.status(200).json({
                message: "Meta atualizada com sucesso!"
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async remove(req, res) {
        try {
            const result = await goalService.remove(
                req.params.id,
                req.user.id_user
            );

            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Meta não encontrada!"
                });
            }

            return res.status(200).json({
                message: "Meta removida com sucesso!"
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async activate(req, res) {
        try {
            const result = await goalService.activate(
                req.params.id,
                req.user.id_user
            );

            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Meta não encontrada!"
                });
            }

            return res.status(200).json({
                message: "Meta ativada com sucesso!"
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };
};

export default new GoalController();