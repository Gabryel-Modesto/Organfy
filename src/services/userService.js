import User from "../database/models/user.js";

class UserService{
    async create(userData){
        
        const user = await User.create(userData);

        return user;
        
    }
}

export default new UserService();