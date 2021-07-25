const express = require('express');
const { index } = require('./controllers/index-controller');
const { getAllRouters, getWidgetsByRouter } = require('./controllers/router-controller');
const { getWidgetsByTemplate } = require('./controllers/template-controller');
const router = express.Router();

let routes = (app) => {
  router.get('/routers', getAllRouters);
  router.get('/routers/:name/widgets', getWidgetsByRouter);
  router.get('/templates/:name/widgets', getWidgetsByTemplate);
  router.get(/^\/*^(?!.(router|template)s*)((?!\.).)*$/, index);
  return app.use(router);
};

module.exports = routes;
