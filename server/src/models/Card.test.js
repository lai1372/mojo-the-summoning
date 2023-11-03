const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { Card } = require(".");
const { db } = require("../db/config");

// define in global scope
let card;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({
    name: "Shadowblade Assassin",
    mojo: 5,
    stamina: 3,
    imgUrl:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5-SS5I5ksb70Bk814BKDwQ.jpeg",
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Card properties exist", () => {
  test("should have id", async () => {
    expect(card).toHaveProperty("id");
  });
  test("should have name", async () => {
    expect(card).toHaveProperty("name");
  });
  test("should have mojo", async () => {
    expect(card).toHaveProperty("mojo");
  });
  test("should have stamina", async () => {
    expect(card).toHaveProperty("stamina");
  });
  test("should have image url", async () => {
    expect(card).toHaveProperty("imgUrl");
  });
});

describe("Card data types and values", () => {
  test("should store correct name", () => {
    expect(card.name).toBe("Shadowblade Assassin");
  });
  test("should store correct name", () => {
    expect(card.mojo).toBe(5);
  });
  test("should store correct name", () => {
    expect(card.stamina).toBe(3);
  });
  test("should store correct name", () => {
    expect(card.imgUrl).toBe(
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5-SS5I5ksb70Bk814BKDwQ.jpeg"
    );
  });
});
