"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Image.belongsTo(models.Category);
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      CategoryId: DataTypes.UUID,
      file: DataTypes.BLOB("medium"),
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
