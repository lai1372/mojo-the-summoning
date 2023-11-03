const User = require("./User");
const Deck = require("./Deck");
const Attack = require("./Attack");
const Card = require("./Card");

// import the rest of your models above

//set up the associations here
User.hasOne(Deck);
Deck.belongsTo(User);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, { through: "AttackCard" });
Attack.belongsToMany(Card, { through: "AttackCard" });

// and then export them all below
module.exports = { User, Deck, Attack, Card };
