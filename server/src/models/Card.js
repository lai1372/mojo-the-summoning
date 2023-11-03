const { DataTypes, Model, db } = require("../db/config");

// create your User model here
class Card extends Model {}

Card.init(
  {
    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "card",
  }
);

module.exports(Card);
