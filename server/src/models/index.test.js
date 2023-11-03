const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { User, Deck } = require(".");
const { db } = require("../db/config");

// define in global scope

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("user associations", () => {
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
});

describe("deck associations", () => {
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
