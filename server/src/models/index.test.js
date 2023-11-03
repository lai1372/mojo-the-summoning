const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { User, Deck, Card, Attack } = require(".");
const { db } = require("../db/config");
const { json } = require("sequelize");

// define in global scope

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("user/deck associations", () => {
  test("user should be correctly associated with deck", async () => {
    let user = await User.create({ username: "gandalf" });
    let deck = await Deck.create({
      name: "Mystic Beasts of Eldoria",
      xp: 1000,
    });
    await user.setDeck(deck);
    const addedDeck = await user.getDeck();
    expect(addedDeck.name).toBe("Mystic Beasts of Eldoria");
    expect(addedDeck.xp).toBe(1000);
  });

  test("user should only be allowed to have one deck", async () => {
    let user = await User.create({ username: "gandalf" });

    let deck = await Deck.create({
      name: "Celestial Guardians",
      xp: 800,
    });
    let deck2 = await Deck.create({
      name: "Mystic Beasts of Eldoria",
      xp: 1000,
    });
    await user.setDeck(deck, deck2);
    const addedDeck = await user.getDeck();
    expect(addedDeck.name).toBe("Celestial Guardians");
  });
  test("deck should be correctly associated with user", async () => {
    let user = await User.create({ username: "gandalf" });
    let deck = await Deck.create({
      name: "Mystic Beasts of Eldoria",
      xp: 1000,
    });
    await deck.setUser(user);
    const addedUser = await deck.getUser();
    expect(addedUser.username).toBe("gandalf");
  });

  test("deck should only be allowed to have one user", async () => {
    let user = await User.create({ username: "gollum" });
    let user2 = await User.create({ username: "gandalf" });

    let deck = await Deck.create({
      name: "Celestial Guardians",
      xp: 800,
    });

    await deck.setUser(user, user2);
    const addedUser = await deck.getUser();
    expect(addedUser.username).toBe("gollum");
  });
});

describe("deck/card association", () => {
  test("deck should be able to store many cards ", async () => {
    const deck = await Deck.create({
      name: "Celestial Guardians",
      xp: 800,
    });
    const card = await Card.create({
      name: "Fire Elemental",
      mojo: 5,
      stamina: 3,
      imgUrl:
        "https://cdn.dribbble.com/users/6012291/screenshots/14165392/media/90513884b71a325901ecde929477e9e7.jpg",
    });
    const card2 = await Card.create({
      name: "Nature's Guardian",
      mojo: 4,
      stamina: 8,
      imgUrl:
        "https://images.nightcafe.studio/jobs/ULJ3jQ9w65nmbwzjqiUT/ULJ3jQ9w65nmbwzjqiUT--1--bmgsp.jpg?tr=w-1600,c-at_max",
    });
    await deck.addCards([card, card2]);
    const addedCards = await deck.getCards();
    expect(addedCards.length).toBe(2);
    expect(addedCards[0].name).toBe("Fire Elemental");
    expect(addedCards[1].name).toBe("Nature's Guardian");
  });

  test("card should only have one deck", async () => {
    const card = await Card.create({
      name: "Fire Elemental",
      mojo: 5,
      stamina: 3,
      imgUrl:
        "https://cdn.dribbble.com/users/6012291/screenshots/14165392/media/90513884b71a325901ecde929477e9e7.jpg",
    });
    const deck = await Deck.create({
      name: "Celestial Guardians",
      xp: 800,
    });
    let deck2 = await Deck.create({
      name: "Mystic Beasts of Eldoria",
      xp: 1000,
    });
    await card.setDeck(deck, deck2);
    const allDecks = await card.getDeck();
    expect(allDecks.name).toBe("Celestial Guardians");
  });
});

describe("card/attack association", () => {
  test("card should have many attacks ", async () => {
    const card = await Card.create({
      name: "Fire Elemental",
      mojo: 5,
      stamina: 3,
      imgUrl:
        "https://cdn.dribbble.com/users/6012291/screenshots/14165392/media/90513884b71a325901ecde929477e9e7.jpg",
    });

    const attack = await Attack.create({
      title: "Entangling Vines",
      mojoCost: 2,
      staminaCost: 4,
    });

    const attack2 = await Attack.create({
      title: "Lightning Bolt",
      mojoCost: 10,
      staminaCost: 6,
    });
    const addAttacks = await card.addAttacks([attack, attack2]);
    const cardsWithAttacks = await card.getAttacks();
    expect(cardsWithAttacks.length).toBe(2);
    expect(cardsWithAttacks[0].title).toBe("Entangling Vines");
    expect(cardsWithAttacks[1].title).toBe("Lightning Bolt");
  });

  test("attacks should have many cards ", async () => {
    const card = await Card.create({
      name: "Fire Elemental",
      mojo: 5,
      stamina: 3,
      imgUrl:
        "https://cdn.dribbble.com/users/6012291/screenshots/14165392/media/90513884b71a325901ecde929477e9e7.jpg",
    });
    const card2 = await Card.create({
      name: "Nature's Guardian",
      mojo: 4,
      stamina: 8,
      imgUrl:
        "https://images.nightcafe.studio/jobs/ULJ3jQ9w65nmbwzjqiUT/ULJ3jQ9w65nmbwzjqiUT--1--bmgsp.jpg?tr=w-1600,c-at_max",
    });

    const attack = await Attack.create({
      title: "Entangling Vines",
      mojoCost: 2,
      staminaCost: 4,
    });

    const addCards = await attack.addCards([card, card2]);
    const attacksWithCards = await attack.getCards();
    expect(attacksWithCards.length).toBe(2);
    expect(attacksWithCards[0].name).toBe("Fire Elemental");
    expect(attacksWithCards[0].mojo).toBe(5);
    expect(attacksWithCards[0].stamina).toBe(3);

    expect(attacksWithCards[1].name).toBe("Nature's Guardian");
    expect(attacksWithCards[1].mojo).toBe(4);
    expect(attacksWithCards[1].stamina).toBe(8);
  });
});
