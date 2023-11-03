const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { Deck } = require(".");
const { db } = require("../db/config");

// define in global scope
let deck;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({
    name: "Mystic Beasts of Eldoria",
    xp: 1000,
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Deck properties exist", () => {
  test("should have id", async () => {
    expect(deck).toHaveProperty("id");
  });
  test("should have name", async () => {
    expect(deck).toHaveProperty("name");
  });
  test("should have xp", async () => {
    expect(deck).toHaveProperty("xp");
  });
});

describe("Deck data types and values", () => {
  test("should store correct name", () => {
    expect(deck.name).toBe("Mystic Beasts of Eldoria");
  });
  test("should store correct xp", () => {
    expect(deck.xp).toBe(1000);
  });
});
