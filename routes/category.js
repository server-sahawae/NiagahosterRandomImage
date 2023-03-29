const Controller = require("../controllers/category");

const routes = require("express").Router();

routes.post("/", Controller.createCategory);

module.exports = routes;
