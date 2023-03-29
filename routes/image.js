const Controller = require("../controllers/image");

const routes = require("express").Router();

routes.post("/", Controller.insertImage);

module.exports = routes;
