import authService from "../services/authService.js";

class AuthController {
    async login(req, res) {
        try {
            const user = await authService.login(req.body);

            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};

export default new AuthController();