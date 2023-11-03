const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { User } = require(".");
const { db } = require("../db/config");

// define in global scope
let user;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: "gandalf" });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("User", () => {
  test("should have id", async () => {
    expect(user).toHaveProperty("id");
  });
  test("should have username", async () => {
    expect(user).toHaveProperty("username");
  });
});

describe("Test values are correct", () => {
  test("should store correct username", () => {
    expect(user.username).toBe("gandalf");
  });
});
