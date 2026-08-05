import userService from "../services/userService.js";
class UserController{

    async create(req, res){
        try{
            const user = await userService.createUser(req.body);

            return res.status(201).json(user);

        } catch(error){
            return res.status(400).json({
                message: error.message
            });
        };
    };

};



export default new UserController();

