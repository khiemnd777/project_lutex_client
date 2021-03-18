# LUTEX.IO
---
## Description
LUTEX.IO - A Lutex's Product.

## What we have here?
- [Preact](https://preactjs.com/) with API compatible with React. We use Preact for lightweight, fast and memory usage in mind.
- [Redux Zero](https://github.com/redux-zero/redux-zero)
- [typescript](https://www.typescriptlang.org/)
- [scss/sass](https://sass-lang.com/guide)
- [d3js](https://d3js.org/)
- [momentjs](https://momentjs.com/)
- [rollup](https://rollupjs.org/guide/en/) as bundler/builder
- some may be added later...

## Notes
- No jquery!! We consider not to use jQuery 'cause of tons of security concerns. Use ref and native DOM APIs instead.
- underscore: Reduce usage of underscore js. Currently, I suggest to use lodash (with better API design and mostly compatible with underscore) or use native JS as much as posible.

## Tools
- Suggest use [Visual Studio Code](https://code.visualstudio.com/)
- NodeJS latest version, suggest to use v12.18.x

## Build

YARN favor
```sh
$ yarn build
$ yarn build --secure=false --api-host=localhost --api-port=1337
$ yarn build:ssr
$ yarn build:ssr --secure=false --api-host=localhost --api-port=1337 --port=7777
```
## Development
```sh
$ yarn build:dev
$ yarn build:dev --secure=false --api-host=linlee.studio --api-port=1337
$ yarn build:ssr:dev
$ yarn build:ssr:dev --secure=false --api-host=linlee.studio --api-port=1337 --port=7777
```
## Debugging
During development we use sourcemap to debug ts/tsx code dirrectly on browser (IE, Chrome, FireFox, Edge).
