const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { Attack } = require(".");
const { db } = require("../db/config");

// define in global scope
let attack;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({
    title: "Entangling Vines",
    mojoCost: 2,
    staminaCost: 4,
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Attack properties exist", () => {
  test("should have id", async () => {
    expect(attack).toHaveProperty("title");
  });
  test("should have mojo cost", async () => {
    expect(attack).toHaveProperty("mojoCost");
  });
  test("should have stamina cost", async () => {
    expect(attack).toHaveProperty("staminaCost");
  });
});

describe("Attack data types and values", () => {
  test("should store correct title", () => {
    expect(attack.title).toBe("Entangling Vines");
  });
  test("should store correct mojo cost", () => {
    expect(attack.mojoCost).toBe(2);
  });
  test("should store correct stamina cost", () => {
    expect(attack.staminaCost).toBe(4);
  });
});
