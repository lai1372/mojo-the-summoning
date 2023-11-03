const User = require("./User");
const Deck = require("./Deck");
const Attack = require("./Attack");
const Card = require("./Card");

// import the rest of your models above

//set up the associations here
User.hasOne(Deck)
Deck.belongsTo(User)


// and then export them all below
module.exports = { User, Deck, Attack, Card };
