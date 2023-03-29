const { Sequelize } = require("sequelize");
const { Category, Image } = require("../models");

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

  static async getCategoryItems(req, res, next) {
    try {
      const { CategoryId } = req.params;
      const { file } = await Image.findOne({
        where: { CategoryId },
        attributes: ["file"],
        order: Sequelize.literal("rand()"),
      });
      res.status(200).type("image/webp").send(file);
    } catch (error) {
      next(error);
    }
  }
};
