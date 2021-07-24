const express = require("express");
const { index } = require('./controllers/index-controller');
const { getAllRouters, getRouter } = require('./controllers/router-controller');
const router = express.Router();

let routes = (app) => {
  router.get("/routers", getAllRouters);
  router.get("/routers/:name", getRouter);
  router.get(/^\/*((?!\.).)*$/, index);
  return app.use("/", router);
};

module.exports = routes;
