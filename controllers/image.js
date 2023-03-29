const { Category } = require("../models");

module.exports = class Controller {
  static async insertImage(req, res, next) {
    try {
      const { name } = req.body;
      const { image } = req.files;
      // const data = await Category.create({ name });
      console.log(image.name);
      res.status(200).json("ok");
    } catch (error) {
      next(error);
    }
  }
};
