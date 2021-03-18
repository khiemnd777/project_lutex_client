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

export default () => html({
  title: 'Hello folks!',
  fileName: 'index.html',
  template: generateHtmlBundle,
  meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
});
