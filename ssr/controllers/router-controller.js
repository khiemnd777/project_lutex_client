const path = require('path');
const { readFileSync } = require('../utils');

module.exports = {
  async getAllRouters(req, res) {
    const routersDir = path.resolve(process.env.ROOT_PATH, '../', 'src/routers');
    const routersFile = path.join(routersDir, '/config.json');
    let routersJson = await readFileSync(routersFile);
    res.json(routersJson);
  },
  async getRouter(req, res) {
    res.send('/router/:name');
  },
};
