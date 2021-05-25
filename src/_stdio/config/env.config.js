const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
const env = dotenv.config();
if (env.error) throw env.error;
const envParsed = dotenvParseVariables(env.parsed);

module.exports = (name) => {
  return envParsed[name];
}
