const axios = require('axios');
const path = require('path');
const fs = require('fs');
const env = require('../../src/_stdio/config/env.config');

if (process.env.NODE_ENV === 'production') {
  console.log('reject unauthorized!');
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

const distPath = env('DIST');
// Api host
const apiSecure = !!env('API_SECURE') || false;
const secureProtocol = apiSecure ? 'https' : 'http';
const apiPort = env('API_PORT');
const apiHostName = env('API_HOST');
const apiHost = `${secureProtocol}://${apiHostName}:${apiPort}/`;
// Client host
const clientSecure = !!env('CLIENT_SECURE') || false;
const clientSecureProtocal = clientSecure ? 'https' : 'http';
const clientPort = process.env.NODE_ENV === 'production' ? '' : env('CLIENT_PORT');
const clientHostName = env('CLIENT_HOST');
const clientHost = `${clientSecureProtocal}://${clientHostName}${!!clientPort ? `:${clientPort}` : ''}/`;

async function fetchSeo(req) {
  let seo = null;
  try {
    const baseUrl = !!req.baseUrl ? req.baseUrl : req.originalUrl;
    const seoUrl = `${apiHost}seo${baseUrl}`;
    const seoData = await axios.get(seoUrl);
    seo = seoData ? seoData.data : null;
    if (seo && seo.Facebook) {
      // Attach facebook's og:url
      const realBaseUrl = baseUrl.replace(/^\/+/i, '');
      !seo.Facebook.Url && (seo.Facebook.Url = `${clientHost}${realBaseUrl}`);
    }
  } catch {}
  return seo;
}

async function fetchGTag(req) {
  let gtag = null;
  try {
    const gtagResult = await axios.get(`${apiHost}googleAnalyticId`);
    gtag = gtagResult ? gtagResult.data : null;
  } catch (e) {
    console.log(e);
  }
  return gtag;
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

const genrateHtml = (req, res, seoData, gtagData) => {
  const domFile = `${distPath}/client.html`;
  fs.readFile(path.resolve(domFile), 'utf-8', async (err, data) => {
    if (err) {
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
    if (gtagData) {
      data = data.replace(/\{\{gtag\}\}/gm, gtagData);
    }
    return res.send(data);
  });
};

module.exports = {
  async index(req, res) {
    let seo = null;
    let gtag = null;
    try {
      const result = await Promise.all([fetchPtk(req), fetchSeo(req), fetchGTag(req)]);
      const pairedPtk = result[0];
      if (!pairedPtk) {
        res.send(`This is a private page.`);
        return;
      }
      seo = result[1];
      gtag = result[2];
    } catch (exc) {}
    genrateHtml(req, res, seo, gtag);
  },
};
