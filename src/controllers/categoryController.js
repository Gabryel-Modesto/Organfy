import categoryService from "../services/categoryService.js";

class CategoryController {
  async create(req, res) {
    try {
      const category = await categoryService.create(req.body, req.user.id_user);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const categories = await categoryService.findAllByUser(req.user.id_user);

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findById(req, res) {
    try {
      const category = await categoryService.findById(
        req.params.id,
        req.user.id_user,
      );

      if (!category) {
        return res.status(404).json({
          message: "Categoria não encontrada!",
        });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findInactiveByUser(req, res) {
    try {
      const categories = await categoryService.findInactiveByUser(
        req.user.id_user,
      );

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const result = await categoryService.remove(
        req.params.id,
        req.user.id_user,
      );

      if (result[0] === 0) {
        return res.status(404).json({
          message: "Categoria não encontrada!",
        });
      }

      return res.status(200).json({
        message: "Categoria removida com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async activate(req, res) {
    try {
      const result = await categoryService.activate(
        req.params.id,
        req.user.id_user,
      );

      if (result[0] === 0) {
        return res.status(404).json({
          message: "Categoria não encontrada!",
        });
      }
      return res.status(200).json({
        message: "Categoria ativada com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const allowedFields = [
        "name_category",
        "color_category",
        "icon_category",
        "type_category",
      ];

      const invalidFields = Object.keys(req.body).filter(
        (field) => !allowedFields.includes(field),
      );

      if (invalidFields.length > 0) {
        return res.status(400).json({
          message: "Existem campos não permitidos na requisição."
        });
      };

      const result = await categoryService.update(
        req.params.id,
        req.user.id_user,
        req.body,
      );

      if (result[0] === 0) {
        return res.status(404).json({
          message: "Categoria não encontrada!",
        });
      }

      return res.status(200).json({
        message: "Categoria atualizada com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new CategoryController();
