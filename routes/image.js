const Controller = require("../controllers/image");

const routes = require("express").Router();

if (process.env.NODE_ENV !== "production")
  routes.post("/", Controller.insertImage);

module.exports = routes;
