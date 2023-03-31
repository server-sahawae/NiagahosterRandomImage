const sharp = require("sharp");
const { loggerError, loggerInfo } = require("../helpers/loggerDebug");
const { Image } = require("../models");

module.exports = class Controller {
  static async insertImage(req, res, next) {
    try {
      loggerInfo("Inserting image");
      const imagesData = req.files.images;

      loggerInfo(Object.keys(imagesData));
      const { CategoryId } = req.body;
      loggerInfo(CategoryId);
      loggerInfo(Array.isArray(imagesData));
      if (!Array.isArray(imagesData)) {
        const convertedImage = await sharp(imagesData.data)
          .toFormat("webp")
          .toBuffer();
        loggerInfo("image converted");
        const result = await Image.create({
          name: imagesData.name,
          file: convertedImage,
          CategoryId,
        });
        loggerInfo("image inserted to database!");
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
