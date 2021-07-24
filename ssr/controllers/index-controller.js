const axios = require('axios');
const path = require('path');
const fs = require('fs');
const env = require('../../src/_stdio/config/env.config');

const distPath = env('DIST');
const port = env('PORT');
// Api host
const apiSecure = !!env('API_SECURE') || false;
const secureProtocol = apiSecure ? 'https' : 'http';
const apiPort = env('API_PORT');
const apiHostName = env('API_HOST');
const apiHost = `${secureProtocol}://${apiHostName}:${apiPort}/`;
// Client host
const clientSecure = !!env('CLIENT_SECURE') || false;
const clientSecureProtocal = clientSecure ? 'https' : 'http';
const clientHostName = env('CLIENT_HOST');
const clientHost = `${clientSecureProtocal}://${clientHostName}${!!port ? `:${port}` : ''}/`;

async function fetchSeo(req) {
  let seo = null;
  try {
    const seoUrl = `${apiHost}seo${req.baseUrl}`;
    const seoData = await axios.get(seoUrl);
    seo = seoData ? seoData.data : null;
    if (seo && seo.Facebook) {
      // Attach facebook's og:url
      const realBaseUrl = req.baseUrl.replace(/^\/+/i, '');
      !seo.Facebook.Url && (seo.Facebook.Url = `${clientHost}${realBaseUrl}`);
    }
  } catch {}
  return seo;
}

async function fetchPtk(req) {
  const ptk = req.query.ptk;
  const ptkUrl = `${apiHost}environment/pairptk/${ptk}`;
  const pairPtkData = await axios.get(ptkUrl);
  return pairPtkData.data;
}

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

const genrateHtml = (req, res, seoData) => {
  const domFile = `${distPath}/index.html`;
  fs.readFile(path.resolve(domFile), 'utf-8', async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Some errors happened');
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

module.exports = {
  async index(req, res) {
    let seo = null;
    try {
      const result = await Promise.all([fetchPtk(req), fetchSeo(req)]);
      const pairedPtk = result[0];
      if (!pairedPtk) {
        res.send(`This is a private page.`);
        return;
      }
      seo = result[1];
    } catch (exc) {}
    genrateHtml(req, res, seo);
  },
};
