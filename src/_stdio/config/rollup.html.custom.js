import { makeHtmlAttributes } from '@rollup/plugin-html';
import html from '@rollup/plugin-html';
import { extname } from 'path';

const generateInlineElements = (bundle) => {
  const files = Object.values(bundle).filter(
    (file) => file.isEntry || (typeof file.type === 'string' ? file.type === 'asset' : file.isAsset)
  );
  var scripts = [];
  var styles = [];
  for (const file of files) {
    const { fileName } = file;
    const extension = extname(fileName).substring(1);
    if (extension === 'js') {
      scripts.push(`<script src="/${fileName}?_=${Date.now()}"></script>`);
    } else if (extension === 'css') {
      styles.push(`<link rel="stylesheet" href="/${fileName}?_=${Date.now()}" />`);
    }
  }
  return { scripts, styles };
};

export const generateHtmlBundle = ({ attributes, files, meta, publicPath, title, bundle }) => {
  const { scripts, styles } = generateInlineElements(bundle);
  const scriptElements = scripts.join('\n');
  const styleElements = styles.join('\n');

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
<head>
<link rel='shortcut icon' type='image/x-icon' href='/assets/fav-icons/favicon.ico' />
<link rel='icon' type='image/png' href='/assets/fav-icons/favicon.png' />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/fav-icons/180.png">
<link rel="icon" type="image/png" sizes="57x57" href="/assets/fav-icons/57.png">
<link rel="icon" type="image/png" sizes="76x76" href="/assets/fav-icons/76.png">
<link rel="icon" type="image/png" sizes="120x120" href="/assets/fav-icons/120.png">
<link rel="icon" type="image/png" sizes="152x152" href="/assets/fav-icons/152.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/fav-icons/192.png">

${metas}
{{metaTags}}
<title>{{title}}</title>
${styleElements}
</head>
<body>
${scriptElements}
</body>
</html>`;
};

export default () =>
  html({
    title: 'Hello folks!',
    fileName: 'index.html',
    template: generateHtmlBundle,
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
  });
