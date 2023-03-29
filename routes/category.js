const Controller = require("../controllers/category");

const routes = require("express").Router();

routes.post("/", Controller.createCategory);
routes.get("/:CategoryId", Controller.getCategoryItems);

module.exports = routes;
