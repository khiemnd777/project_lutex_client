const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const port = argv.port || '{{PORT}}';
const app = express();
const env = process.env.NODE_ENV;
const secureProtocol = !!argv.secure && argv.secure === 'true' ||
  !argv.secure && '{{SECURE}}' === 'true' ? 'https' : 'http';
const apiPort = argv.apiPort || '{{API_PORT}}';
const apiHostName = argv.apiHost || '{{API_HOST}}';
const apiHost = `${secureProtocol}://${apiHostName}:${apiPort}/`;

const genrateHtml = (req, res, seoData) => {
  const domFile = env === 'development' ? './wwwroot/index.html' : './index.html';
  fs.readFile(path.resolve(domFile), 'utf-8', async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Some error happened');
    }
    if (!!seoData) {
      const seoMetaTags = generateSeoMetaTags(seoData);
      data = data.replace('{{metaTags}}', seoMetaTags);
      data = data.replace('{{title}}', seoData.title);
    }
    return res.send(data);
  });
};


const generateSeoMetaTags = (seoData) => {
  return `
  <meta name="title" content="${seoData.title}">
  <meta name="description" content="${seoData.description}">
  <meta property="og:title" content="${seoData.title}">
  <meta property="og:site_name" content="${seoData.title}">
  <meta property="og:type" content="${seoData.type || 'website'}">
  <meta property="og:url" content="${seoData.url || ''}">
  <meta property="og:image" content="${seoData.image || ''}">
  <meta property="og:description" content="${seoData.description}">
  `;
};

app.use(/^\/*((?!\.).)*$/, (req, res, next) => {
  genrateHtml(req, res);
});

// app.get('/', async (req, res) => {
//   const seoResp = await axios.get(`${apiHost}index`);
//   genrateHtml(req, res, seoResp.data);
// });

// app.get('/page', async (req, res) => {
//   const seoResp = await axios.get(`${apiHost}page`);
//   genrateHtml(req, res, seoResp.data);
// });
         
// app.get('/page/:params', async (req, res) => {
//   const seoResp = await axios.get(`${apiHost}page?params=${req.params.params}`);
//   genrateHtml(req, res, seoResp.data);
// });

app.use(express.static(path.resolve(__dirname, '../', 'wwwroot')));
  
app.listen(port, () => {
  console.log(`App launched on ${port}`);
  console.log(`API launched on ${apiHost}`);
});
