const Controller = require("../controllers/category");

const routes = require("express").Router();

if (process.env.NODE_ENV !== "production")
  routes.post("/", Controller.createCategory);
routes.get("/:CategoryId", Controller.getCategoryItems);

module.exports = routes;
