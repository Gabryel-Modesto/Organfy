import categoryService from "../services/categoryService.js";

class CategoryController {
    
    async create(req, res){
        try{
            const category = await categoryService.create(
                req.body,
                req.user.id_user
            );
            return res.status(201).json(category);
        } catch(error){
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async findAll(req, res){
        try{
            const categories = await categoryService.findAllByUser(
                req.user.id_user
            );

            return res.status(200).json(categories)
        } catch (error){
            return res.status(400).json({
                message: error.message
            })
        }
    } 

    async findById(req, res) {
        try {
            const category = await categoryService.findById(
                req.params.id
            );
    
            return res.status(200).json(category);
    
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

}

export default new CategoryController();