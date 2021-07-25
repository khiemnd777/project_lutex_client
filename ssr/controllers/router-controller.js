const path = require('path');
const { readFileSync } = require('../utils');

function getRouterPath() {
  return path.resolve(process.env.ROOT_PATH, '../', 'src/routers');
}

module.exports = {
  async getAllRouters(req, res) {
    const configFile = path.join(getRouterPath(), '/config.json');
    try {
      const configJson = await readFileSync(configFile);
      res.json(configJson);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  async getWidgetsByRouter(req, res) {
    const name = req.params?.name;
    if (!name) {
      res.status(400).send('Bad request');
    }
    try {
      const configFile = path.join(getRouterPath(), 'config.json');
      const configJson = await readFileSync(configFile);
      const routerFound = configJson.find((x) => x.Name === name);
      if (!routerFound) {
        res.status(204).send('No content found');
        return;
      }
      const routerFile = path.join(getRouterPath(), `${routerFound.FileName}`);
      const routerJson = await readFileSync(routerFile);
      res.json(routerJson);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
