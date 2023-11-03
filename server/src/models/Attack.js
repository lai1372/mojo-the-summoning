const { DataTypes, Model, db } = require("../db/config");

// create your User model here
class Attack extends Model {}

Attack.init(
  {
    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "attack",
  }
);

module.exports = Attack;
