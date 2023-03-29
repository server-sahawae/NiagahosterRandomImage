const { Category } = require("../models");

module.exports = class Controller {
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const data = await Category.create({ name });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
};
