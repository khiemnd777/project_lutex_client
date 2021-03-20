import { resolve } from 'path';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupTs2 from 'rollup-plugin-typescript2';
import rollupPostcss from 'rollup-plugin-postcss';
import rollupJson from '@rollup/plugin-json';
import rollupFilesize from 'rollup-plugin-filesize';
import rollupBabel from '@rollup/plugin-babel';
import rollupReplace from '@rollup/plugin-replace';
import graphql from '@rollup/plugin-graphql';
import { terser } from 'rollup-plugin-terser';
import htmlCustom from './rollup.html.custom';
import preact from 'rollup-plugin-preact';
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const buildConfig = require('./build.config.json');
const env = process.env.NODE_ENV;
const isDevelopmentEnv = env === 'development';
const isBeta = process.env.SITE === 'beta';
const isStaging = process.env.SITE === 'staging';
const argv = yargs(hideBin(process.argv)).argv;

console.log('Environment', env);

// API HOST
const secureProtocol = !!argv.secure && argv.secure === 'true' ? 'https' : 'http';
const apiPort = argv.apiPort || 1337;
const apiHostName = argv.apiHost || (env === 'development' ? 'localhost' : 'lutex.io');
const apiHost = `${secureProtocol}://${apiHostName}:${apiPort}/`;

const plugins = [
  rollupTs2({
    noEmitOnError: false,
  }),
  rollupResolve({
    jsnext: true,
    preferBuiltins: true,
    browser: true,
  }),
  rollupCommonjs({
    include: 'node_modules/**',
  }),
  rollupReplace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(env || 'development'),
  }),
  rollupReplace({
    preventAssignment: true,
    exclude: 'node_modules/**',
    API_HOST: `${apiHost}`,
    delimiters: ['{{', '}}'],
  }),
  rollupBabel({
    presets: [['@babel/preset-env', { targets: { ie: '11', chrome: '58' } }]],
    babelHelpers: 'bundled',
  }),
  rollupPostcss({
    extract: true,
    sourceMap: isDevelopmentEnv,
    modules: {
      globalModulePaths: [/bulma/, /global.styled.scss/, /style.scss/],
      scopeBehaviour: 'local',
      generateScopedName: isDevelopmentEnv
        ? '[name]__[local]___[hash:base64:5]'
        : isBeta || isStaging
        ? '[local]___[hash:base64:8]'
        : '[hash:base64:8]',
    },
    autoModules: false,
    minimize: !isDevelopmentEnv,
    namedExports: (name) => {
      return `${name.replace(/-/g, '_')}`;
    },
  }),
  preact({
    usePreactX: true, // usePreactX is auto resolvePreactCompat: true.
    noPropTypes: false,
    noReactIs: false,
    noEnv: false,
    resolvePreactCompat: true,
    aliasModules: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  }),
  rollupJson({
    namedExports: true,
  }),
  rollupFilesize(),
  htmlCustom(),
  graphql(),
];

!isDevelopmentEnv && plugins.push(terser());

const external = ['Masonry', 'imagesLoaded'];

const globals = {};

export default [
  {
    input: './src/index.tsx',
    watch: isDevelopmentEnv,
    plugins: [...plugins],
    external: external,
    output: {
      sourcemap: isDevelopmentEnv,
      dir: resolve(buildConfig.dist),
      format: 'iife',
      globals: globals,
    },
    watch: {
      buildDelay: 500,
      clearScreen: false,
      chokidar: {
        ignoreInitial: true,
        useFsEvents: true,
      },
      exclude: ['node_modules/**'],
    },
  },
];
