const path = require('path');
const { readFileSync } = require('../utils');

function getTemplatePath() {
  return path.resolve(process.env.ROOT_PATH, '../', 'src/templates');
}

module.exports = {
  async getTemplate(req, res) {
    const name = req.params?.name;
    if (!name) {
      res.status(204).send('No content found');
    }
    const templateFile = path.join(getTemplatePath(), `${name}.json`);
    try {
      const templateJson = await readFileSync(templateFile);
      res.json(templateJson);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
