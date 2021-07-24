const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const env = require('../src/_stdio/config/env.config');

process.env.ROOT_PATH = path.resolve(__dirname);

const port = env('CLIENT_PORT');
const app = express();
// Api host
const apiSecure = env('API_SECURE');
const secureProtocol = apiSecure ? 'https' : 'http';
const apiPort = env('API_PORT');
const apiHostName = env('API_HOST');
const apiHost = `${secureProtocol}://${apiHostName}:${apiPort}/`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../', 'wwwroot')));

// Init routes
routes(app);

app.listen(port, () => {
  console.log(`App launched on ${port}`);
  console.log(`API launched on ${apiHost}`);
});
