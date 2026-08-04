import userService from "../services/userService.js";

class UserController{

    async create(req, res){
        try{
            const user = await userService.create(req.body);

            return res.status(201).json(user);


        } catch(error){
            return res.status(400).json({
                massage: error.massage
            });
        }
    }

}

export default new UserController();

