# Lutex.io
### A Lutex's Product.
---
## What we have here?
- [Preact](https://preactjs.com/) with API compatible with React. We use Preact for lightweight, fast and memory usage in mind.
- [Redux Zero](https://github.com/redux-zero/redux-zero)
- [Typescript](https://www.typescriptlang.org/)
- [SCSS/SASS](https://sass-lang.com/guide)
- [Rollup](https://rollupjs.org/guide/en/) as bundler/builder

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
$ yarn build:dev --secure=false --api-host=localhost --api-port=1337
$ yarn build:ssr:dev
$ yarn build:ssr:dev --secure=false --api-host=localhost --api-port=1337 --port=7777
```
