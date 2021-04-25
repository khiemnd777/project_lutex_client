const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const distPath = argv.dist || '{{DIST_PATH}}';
const port = argv.port || '{{PORT}}';
const app = express();
const env = process.env.NODE_ENV;
const secureProtocol =
  (!!argv.secure && argv.secure === 'true') || (!argv.secure && '{{SECURE}}' === 'true') ? 'https' : 'http';
const apiPort = argv.apiPort || '{{API_PORT}}';
const apiHostName = argv.apiHost || '{{API_HOST}}';
const apiHost = `${secureProtocol}://${apiHostName}:${apiPort}/`;

const genrateHtml = (req, res, seoData) => {
  const domFile = `${distPath}/index.html`;
  fs.readFile(path.resolve(domFile), 'utf-8', async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Some error happened');
    }
    if (!!seoData) {
      const seoMetaTags = generateSeoMetaTags(seoData);
      data = data.replace('{{metaTags}}', seoMetaTags);
      data = data.replace('{{title}}', seoData.Title);
    } else {
      data = data.replace('{{metaTags}}', '');
      data = data.replace('{{title}}', '');
    }
    return res.send(data);
  });
};

const generateSeoMetaTags = (seoData) => {
  const facebook = seoData.Facebook;
  const title = seoData.Title;
  const desc = seoData.Description;
  return `
  <meta name="title" content="${title}">
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${facebook ? facebook.Title || title : title}">
  <meta property="og:site_name" content="${facebook ? facebook.SiteName || '' : ''}">
  <meta property="og:type" content="${facebook ? facebook.Type || 'website' : 'website'}">
  <meta property="og:url" content="${facebook ? facebook.Url || '' : ''}">
  <meta property="og:image" content="${facebook ? (facebook.Image && facebook.Image.url) || '' : ''}">
  <meta property="og:description" content="${facebook ? facebook.Description || desc : desc}">
  `;
};

app.use(/^\/*((?!\.).)*$/, async (req, res, next) => {
  let seo = null;
  try {
    const seoUrl = `${apiHost}seo${req.baseUrl}`;
    const seoData = await axios.get(`${seoUrl}`);
    seo = seoData ? seoData.data : null;
  } catch {}
  genrateHtml(req, res, seo);
});

app.use(express.static(path.resolve(__dirname, '../', 'wwwroot')));

app.listen(port, () => {
  console.log(`App launched on ${port}`);
  console.log(`API launched on ${apiHost}`);
});
