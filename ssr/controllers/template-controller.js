const path = require('path');
const { readFileSync } = require('../utils');

function getTemplatePath() {
  return path.resolve(process.env.ROOT_PATH, '../', 'src/templates');
}

module.exports = {
  async getWidgetsByTemplate(req, res) {
    const name = req.params?.name;
    if (!name) {
      res.status(400).send('Bad request');
    }
    try {
      const configFile = path.join(getTemplatePath(), 'config.json');
      const configJson = await readFileSync(configFile);
      const templateFound = configJson.find((x) => x.Name === name);
      if (!templateFound) {
        res.status(204).send('No content found');
        return;
      }
      const templateFile = path.join(getTemplatePath(), `${templateFound.FileName}`);
      const templateJson = await readFileSync(templateFile);
      res.json(templateJson);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
