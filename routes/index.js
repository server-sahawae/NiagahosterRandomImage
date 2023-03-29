const routes = require("express").Router();
const categoryRoutes = require("./category");
const imageRoutes = require("./image");

routes.use("/category", categoryRoutes);
routes.use("/image", imageRoutes);

module.exports = routes;
