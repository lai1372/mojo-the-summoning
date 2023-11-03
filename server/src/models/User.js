const { DataTypes, Model, db } = require("../db/config");

// create your User model here
class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports(User);
