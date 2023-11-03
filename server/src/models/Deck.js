const { DataTypes, Model, db } = require("../db/config");

// create your User model here
class Deck extends Model {}

Deck.init(
  {
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "deck",
  }
);

module.exports(Deck);
