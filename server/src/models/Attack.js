const { DataTypes, Model, db } = require("../db/config");

// create your User model here
class Attack extends Model {}

Attack.init(
  {
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "attack",
  }
);

module.exports = Attack;
