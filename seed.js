const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const { sequelize } = require("./db");
const { User, Item } = require("./models");

const createUsers = async () => {
  const users = [
    { name: "Dan", password: "1234" },
    { name: "Linda", password: "password" },
    { name: "Andés", password: "password" },
    { name: "Brad", password: "password" },
    { name: "Rene", password: "password" },
    { name: "RZ", password: "password" },
    { name: "Stanley", password: "password" },
    { name: "Constance", password: "password" },
    { name: "Jin", password: "password" },
    { name: "Shafee", password: "password" },
    { name: "Diana", password: "password" },
  ];

  return users;
};

const items = [{ name: "Gold" }, { name: "Silver" }, { name: "Paladium" }];

const seed = async () => {
  await sequelize.sync({ force: true });

  const users = await createUsers(); // create users w/ encrypted passwords

  const userPromises = users.map((user) => User.create(user));
  const itemPromises = items.map((item) => Item.create(item));
  await Promise.all([...userPromises, ...itemPromises]);
  console.log("db populated!");
};

seed();
