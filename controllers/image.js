const sharp = require("sharp");
const { loggerError } = require("../helpers/loggerDebug");
const { Image } = require("../models");

module.exports = class Controller {
  static async insertImage(req, res, next) {
    try {
      const imagesData = req.files.images;
      const { CategoryId } = req.body;

      console.log(Array.isArray(imagesData));
      if (!Array.isArray(imagesData)) {
        const convertedImage = await sharp(imagesData.data)
          .toFormat("webp")
          .toBuffer();
        const result = await Image.create({
          name: imagesData.name,
          file: convertedImage,
          CategoryId,
        });
        res.status(200).json(result.name + " has been added");
      } else {
        const data = await Promise.all(
          imagesData.map(async (el) => {
            return {
              name: el.name,
              file: await sharp(el.data).toFormat("webp").toBuffer(),
              CategoryId,
            };
          })
        );
        const result = await Image.bulkCreate(data);
        res.status(200).json(result.map((el) => el.name + " has been added"));
      }
    } catch (error) {
      next(error);
    }
  }
};
